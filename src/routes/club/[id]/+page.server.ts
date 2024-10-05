import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
    const club = await locals.clubRepository.getClub(params.id);
    if (club === "not_found") {
        error(404, {
            message: 'Clubul nu a fost gasit',
        });
    }
    if (!club) {
        error(500, {
            message: 'Eroare interna',
        });
    }

    return {
        club: club
    };
}) satisfies PageServerLoad;
