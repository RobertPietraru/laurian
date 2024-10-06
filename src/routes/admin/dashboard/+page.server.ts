import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {

    const clubs = await locals.clubRepository.getClubs(1, 10);
    if (clubs === null) {
        return error(500, { message: 'O eroare necunoscuta a aparut' });
    }

    return {
        clubs
    };
};
