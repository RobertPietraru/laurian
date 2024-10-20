import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { logger } from '$lib/stores/logger';
import type { Club } from '$lib/features/clubs/models';

export const load = async ({ params, locals }) => {

    const club = await locals.clubRepository.getClub(params.id);
    if (club === null) {
         error(500, { message: 'O eroare necunoscuta a aparut' });
    }
    if (club === "not_found") {
         error(404, { message: 'Clubul nu a fost gasit' });
    }

    return {
        club: club as Club
    };
};

export const actions: Actions = {
    update: async ({ locals, request, params }) => {
        logger.info('Updating club:', params.id);
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const description = data.get('description')?.toString();
        const filesLeftString = data.get('filesLeft')?.toString();
        const initialFilesString = data.get('initialFiles')?.toString();
        var initialFiles: string[] = [];
        var filesLeft: string[] = [];
        var memberCount: number;
        try {
            memberCount = parseInt(data.get('memberCount')?.toString() || '0');
            initialFiles = JSON.parse(initialFilesString || '[]');
            filesLeft = JSON.parse(filesLeftString || '[]');

        } catch (error) {
            logger.error("Error parsing initialFiles, filesToDelete or memberCount: ", error);
            return fail(400, { message: 'Eroare la parsarea datelor' });
        }


        /// make sure fields are not empty

        var filesToUpload: File[] = [];
        for (let [key, value] of data.entries()) {
            if (value instanceof File) {
                filesToUpload.push(value);
            }
        }


        if (!name || !description || memberCount === null || memberCount === undefined) {
            logger.info(`Failed Updating club: ${params.id} because one of the fields is missing: `, name, description, memberCount);
            return fail(400, { message: 'Toate campurile sunt obligatorii' });
        }

        const err = await locals.clubRepository.updateClub({
            id: params.id,
            name: name,
            description: description,
            memberCount: memberCount,
            filesToUpload: filesToUpload,
            filesLeft: filesLeft,
            initialFiles: initialFiles
        });
        if (err) {
            return fail(500, { message: 'Eroare la salvarea datelor' });
        }
        logger.info(`Club ${params.id} was updated`);
        return { success: true };


    },
};
