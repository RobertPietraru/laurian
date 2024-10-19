import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
    const userId = params.id;
    if (!locals.adminRepository) {
        throw redirect(302, '/');
    }
    const user = await locals.adminRepository.getUserById(userId);
    const clubs = await locals.adminRepository.getAllClubs();
    const clubsWithEditor = await locals.adminRepository.getAllClubsWithEditor(userId);
    if (!clubs || !clubsWithEditor) {
        throw error(500, 'Failed to fetch clubs');
    }

    if (!user) {
        throw error(404, 'User not found');
    }

    return { user, clubs: clubs.map((club) => ({ ...club, isEditor: clubsWithEditor.includes(club.id) })) };
};


export const actions = {
    default: async ({ locals, request }) => {
        const formData = await request.formData();
        const userId = formData.get('userId') as string;
        const selectedClubIds = formData.get('selectedClubIds');
        const clubIds = formData.get('clubIds');

        console.log(selectedClubIds, clubIds);



    }
};

