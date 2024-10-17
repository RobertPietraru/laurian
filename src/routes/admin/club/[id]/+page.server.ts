import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ params, locals }) => {

    const club = await locals.clubRepository.getClub(params.id);
    if (club === null) {
        return error(500, { message: 'O eroare necunoscuta a aparut' });
    }
    if (club === "not_found") {
        return error(404, { message: 'Clubul nu a fost gasit' });
    }
    return {
        club: club
    };
};

export const actions: Actions = {
    update: async ({ locals, request, params }) => {
        console.log('Updating club:', params.id);
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const description = data.get('description')?.toString();
        const memberCount = parseInt(data.get('memberCount')?.toString() || '0');
        /// make sure fields are not empty

        if (!name || !description || !memberCount) {
            console.log('Missing fields:', name, description, memberCount);
            return fail(400, { message: 'Toate campurile sunt obligatorii' });
        }

        const err = await locals.clubRepository.updateClub({
            id: params.id,
            name: name,
            description: description,
            memberCount: memberCount
        });
        console.log('Error:', err);
        if (err) {
            return fail(500, { message: 'Eroare la salvarea datelor' });
        }
        console.log('Club updated successfully');
        return { success: true };


    },
    delete: async ({ locals, params }) => {
        const err = await locals.clubRepository.deleteClub(params.id);
        if (err) {
            return fail(500, { message: 'Eroare la stergerea datelor' });
        }
        throw redirect(303, '/admin/dashboard');
    }
};
