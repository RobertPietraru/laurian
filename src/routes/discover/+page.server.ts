import { env } from '$env/dynamic/private';
import { ClubRepository } from '$lib/clubs/club_repository';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    try {
        const clubs = await locals.clubRepository.getClubs(0, 50);

        return {
            clubs: clubs
        };
    } catch (error) {
        console.error('Error fetching clubs:', error);
        return {
            clubs: []
        };
    }
}) satisfies PageServerLoad;
