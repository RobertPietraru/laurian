import type { SupabaseClient } from "@supabase/supabase-js";
import * as models from "./models";
import * as dtos from "./dtos";
import { logger } from '$lib/stores/logger';
import type { ClubDto, CreateClubDto } from "./dtos";




export class ClubRepository {
    private supabase: SupabaseClient;
    private supabaseUrl: string;

    constructor(supabase: SupabaseClient, supabaseUrl: string) {
        this.supabase = supabase;
        this.supabaseUrl = supabaseUrl;
    }

    async getClub(id: string): Promise<models.Club | "not_found" | null> {
        const { data: club, error: supabaseError } = await this.supabase
            .from('clubs')
            .select('*')
            .eq('id', id)
            .single<ClubDto>();

        if (supabaseError) {
            // if the error is a 404, return "not_found"
            if (supabaseError.code === 'PGRST116') {
                return "not_found";
            }
            logger.error("Error fetching club: ", supabaseError);
            return null;
        }
        return models.clubFromJson(club, this.supabaseUrl);
    }
    async getClubsForEditor(editorId: string): Promise<models.Club[] | null> {
        const { data, error } = await this.supabase.from('club_editors').select('*').eq('user', editorId);
        if (error) {
            logger.error("Error getting clubs for editor: ", error);
            return null;
        }
        // get clubs
        const { data: clubs, error: clubsError } = await this.supabase.from('clubs').select('*').in('id', data.map((club) => club.club));
        if (clubsError) {
            logger.error("Error getting clubs for editor: ", clubsError);
            return null;
        }
        return clubs.map((club) => models.clubFromJson(club, this.supabaseUrl));
    }

    async getClubs(page: number, batch: number): Promise<models.Club[] | null> {
        const { data: clubs, error } = await this.supabase
            .from('clubs')
            .select('*')
            .order('created', { ascending: false })
            .limit(50).returns<ClubDto[]>();

        if (error) {
            logger.error('Error fetching clubs:', error);
            return null;
        }
        return clubs.map(club => models.clubFromJson(club, this.supabaseUrl));
    }

    async createClub(params: dtos.CreateClubParams): Promise<string | null> {
        try {
            logger.info(`Creating club ${params.name}`);
            const { data: clubRecord, error } = await this.supabase
                .from('clubs')
                .insert({
                    id: crypto.randomUUID(),
                    description: params.description,
                    name: params.name,
                    memberCount: params.memberCount,
                    files: params.files.map(file => file.name),
                } satisfies CreateClubDto)
                .select()
                .single<ClubDto>();

            if (error) throw error;
            logger.info(`Created club ${clubRecord.id}`);


            // Upload files to storage
            for (const file of params.files) {
                const { error: uploadError } = await this.supabase.storage
                    .from('laurianbucket')
                    .upload(`${clubRecord.id}/${crypto.randomUUID()}_${file.name}`, file);

                if (uploadError) {
                    logger.error("Error uploading file: ", uploadError);
                    // You might want to handle this error, perhaps by deleting the club record
                    // and returning a failure response
                }
            }
            logger.info(`Created club ${clubRecord.id}`);
            return clubRecord.id;
        } catch (error) {
            logger.error(`Error creating club ${params.name}: `, error);
            return null;
        }
    }

    async updateClub(params: dtos.UpdateClubParams): Promise<'unknown' | null> {
        try {
            const initialFiles = params.initialFiles.map(file => file.split('/').pop() ).filter(file => file !== undefined);
            const filesLeft = params.filesLeft.map(file => file.split('/').pop() ).filter(file => file !== undefined);
            var deletionSuccess = true;
            /// delete all files that are not in the initialFiles array
            const filesToDelete = initialFiles.filter(file => !filesLeft.includes(file)).map(file => `${params.id}/${file}`);
            if (filesToDelete.length > 0) {
                const { error: deleteError } = await this.supabase.storage.from('laurianbucket').remove(filesToDelete);
                if (deleteError) {
                    deletionSuccess = false;
                    logger.error("Error deleting files: ", deleteError);
                }
            }
            const nameForFilesToUpload = params.filesToUpload.map(file => `${crypto.randomUUID()}_${file.name}`);
            var namesOfSuccessfullyUploadedFiles: string[] = [];
            /// upload all files that are in the filesToUpload array
            if (params.filesToUpload.length > 0) {
                for (const [index, file] of params.filesToUpload.entries()) {
                    const { error: uploadError } = await this.supabase.storage.from('laurianbucket').upload(`${params.id}/${nameForFilesToUpload[index]}`, file);
                    if (uploadError) {
                        logger.error("Error uploading file: ", uploadError);
                    } else {
                        namesOfSuccessfullyUploadedFiles.push(nameForFilesToUpload[index]);
                    }
                }
            }

            const { error: updateError } = await this.supabase
                .from('clubs')
                .update({
                    description: params.description,
                    name: params.name,
                    memberCount: params.memberCount,
                    files: [...(deletionSuccess ? filesLeft : initialFiles), ...namesOfSuccessfullyUploadedFiles],
                })
                .eq('id', params.id);

            if (updateError) {
                logger.error('Supabase Error updating club:', updateError);
                return 'unknown';
            }




            return null;
        } catch (error) {
            logger.error('Unknown Error updating club:', error);
            return 'unknown';
        }
    }

    async deleteClub(id: string): Promise<'unknown' | null> {
        logger.info('Deleting club:', id);
        const { error: deleteError } = await this.supabase
            .from('clubs')
            .delete()
            .eq('id', id);

        if (deleteError) {
            logger.error('Error deleting club:', deleteError);
            return 'unknown';
        }
        // delete files from storage
        const { error: deleteFilesError } = await this.supabase
            .storage
            .from('laurianbucket')
            .remove([`${id}/*`]);

        if (deleteFilesError) {
            logger.error('Error deleting files:', deleteFilesError);
            return 'unknown';
        }

        return null;
    }
}