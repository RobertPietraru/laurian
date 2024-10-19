import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ locals, request, cookies }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const description = data.get('description')?.toString();
        const memberCount = parseInt(data.get('memberCount')?.toString() || '0');
        const files = [];
        if (!name || !description || memberCount === null || memberCount === undefined) {
            return fail(400, { message: 'Toate campurile sunt obligatorii' });
        }

        for (let [key, value] of data.entries()) {
            if (value instanceof File) {
                files.push(value);
            }
        }

        const id = await locals.clubRepository.createClub({
            description,
            memberCount,
            name,
            files
        })
        if (id === null) {  
            return fail(500, { message: 'Eroare la crearea clubului' });
        }
        throw redirect(303, `/moderator/club/${id}`);
    }
}