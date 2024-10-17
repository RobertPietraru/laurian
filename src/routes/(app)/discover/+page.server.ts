import { error } from '@sveltejs/kit';

export const load = (async ({ locals }) => {

        const clubs = await locals.clubRepository.getClubs(0, 50);
        if (clubs === null) {
            return error(500, 'Ceva nu a mers bine'); 
        }

        return {
            clubs: clubs
        };
}) ;
