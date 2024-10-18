import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    console.log('loading dashboard page');

    const clubs = await locals.clubRepository.getClubs(1, 10);
    if (clubs === null) {
        return error(500, { message: 'O eroare necunoscuta a aparut' });
    }

    return {
        clubs
    };
};
