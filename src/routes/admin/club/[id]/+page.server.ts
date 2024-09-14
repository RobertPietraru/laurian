import { fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError, RecordModel } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { clubFromRecord } from '$lib/models/club';

export const load: PageServerLoad = async ({ locals, params }) => {
    try {
        const club = await locals.pb.collection('clubs').getOne(params.id);
        console.log(club)
        return {
            club: clubFromRecord(club,  env.PB_URL)
        };
    } catch (error) {
        console.error('Error loading club:', error);
        throw redirect(303, '/admin/clubs');
    }
};

export const actions: Actions = {
    default: async ({ locals, request, params }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const description = data.get('description')?.toString();
        const memberCount = parseInt(data.get('memberCount')?.toString() || '0');

        const userId = locals.pb.authStore.model?.id;

        if (!userId) {
            throw redirect(303, '/login');
        }

        try {
            await locals.pb.collection('clubs').update(params.id, {
                'description': description,
                'name': name,
                'memberCount': memberCount,
                'creator': userId,
            });

            return { success: true };
        } catch (error) {
            console.error('Error updating club:', error);
            return fail(500, { message: 'Failed to update club' });
        }
    }
};
