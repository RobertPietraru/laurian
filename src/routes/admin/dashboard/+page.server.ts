import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
    try {
        const clubs = await locals.clubRepository.getClubs(1, 10);
        return {
            clubs
        };
    } catch (error) {
        console.error('Error fetching clubs:', error);
        return {
            clubs: []
        };
    }
};
