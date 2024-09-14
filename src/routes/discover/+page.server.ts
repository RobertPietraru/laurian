import { env } from '$env/dynamic/private';
import { clubFromRecord } from '$lib/models/club';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    try {
        const clubs = await locals.pb.collection('clubs').getList(1, 50, {
            sort: '-created',
        });

        return {
            clubs: clubs.items.map(club => clubFromRecord(club, env.PB_URL))
        };
    } catch (error) {
        console.error('Error fetching clubs:', error);
        return {
            clubs: []
        };
    }
}) satisfies PageServerLoad;
