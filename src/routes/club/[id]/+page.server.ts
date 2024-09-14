import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { clubFromRecord } from '$lib/models/club';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
    try {
        const club = await locals.pb.collection('clubs').getOne(params.id);
        
        if (!club) {
            throw error(404, 'Club not found');
        }

        return {
            club: clubFromRecord(club, env.PB_URL)
        };
    } catch (err) {
        console.error('Error fetching club:', err);
        throw error(404, 'Club not found');
    }
}) satisfies PageServerLoad;
