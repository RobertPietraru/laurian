import type { SupabaseClient } from "@supabase/supabase-js";
import * as models from "./models";
import * as dtos from "./dtos";


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
            .single();

        if (supabaseError) {
            // if the error is a 404, return "not_found"
            if (supabaseError.code === 'PGRST116') {
                return "not_found";
            }
            console.error('Error fetching club:', supabaseError);
            return null;
        }
        return models.clubFromJson(club, this.supabaseUrl);
    }

    async getClubs(page: number, batch: number): Promise<models.Club[] | null> {
        const { data: clubs, error } = await this.supabase
            .from('clubs')
            .select('*')
            .order('created', { ascending: false })
            .limit(50);

        if (error) {
            console.error('Error fetching clubs:', error);
            return null;
        }
        return clubs.map(club => models.clubFromJson(club, this.supabaseUrl));
    }

    async createClub(params: dtos.CreateClubParams): Promise<string | null> {
        try {
            console.log('creating record')
            const { data: clubRecord, error } = await this.supabase
                .from('clubs')
                .insert({
                    id: crypto.randomUUID(),
                    description: params.description,
                    name: params.name,
                    memberCount: params.memberCount,
                    files: params.files.map(file => file.name)  // Store file names in the database
                })
                .select()
                .single();

            if (error) throw error;
            const clubRecordId = clubRecord.id

            console.log('Created club record');

            // Upload files to storage
            for (const file of params.files) {
                const { error: uploadError } = await this.supabase.storage
                    .from('laurianbucket')
                    .upload(`${clubRecordId}/${file.name}`, file);

                if (uploadError) {
                    console.error('Error uploading file:', uploadError);
                    // You might want to handle this error, perhaps by deleting the club record
                    // and returning a failure response
                }
            }

            console.log('Uploaded files');

            return clubRecordId;
        } catch (error) {
            console.log('Error creating club:', error);
            return null;
        }
    }

    async updateClub(params: dtos.UpdateClubParams): Promise<'unknown' | null> {
        try {
            const { error: updateError } = await this.supabase
                .from('clubs')
                .update({
                    description: params.description,
                    name: params.name,
                    memberCount: params.memberCount,
                })
                .eq('id', params.id);

            if (updateError) {
                console.error('Supabase Error updating club:', updateError);
                return 'unknown';
            }

            return null;
        } catch (error) {
            console.error('Unknown Error updating club:', error);
            return 'unknown';
        }
    }

    async deleteClub(id: string): Promise<'unknown' | null> {
        console.log('Deleting club:', id);
        const { error: deleteError } = await this.supabase
            .from('clubs')
            .delete()
            .eq('id', id);

        if (deleteError) {
            console.error('Error deleting club:', deleteError);
            return 'unknown';
        }
        // delete files from storage
        const { error: deleteFilesError } = await this.supabase
            .storage
            .from('laurianbucket')
            .remove([`${id}/*`]);

        if (deleteFilesError) {
            console.error('Error deleting files:', deleteFilesError);
            return 'unknown';
        }

        return null;
    }
}