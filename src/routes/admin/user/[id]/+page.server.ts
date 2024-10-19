import { logger } from '$lib/stores/logger.js';
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
    clubModerationUpdate: async ({ locals, request }) => {
        const formData = await request.formData();
        const userId = formData.get('userId') as string;
        const selectedClubIds = formData.get('selectedClubIds');
        const clubIds = formData.get('clubIds');
        var parsedSelectedClubIds: string[];
        var parsedClubIds: string[];
        try {
            parsedSelectedClubIds = JSON.parse(selectedClubIds as string);
            parsedClubIds = JSON.parse(clubIds as string);
        } catch (error) {
            logger.error(`Error parsing selected club IDs: ${error}`);
            return { success: false, message: 'Invalid selected club IDs' };
        }

        const response = await locals.adminRepository?.addEditorToClubs(userId, parsedSelectedClubIds);
        if (response === 'unknown') {
            return error(500, 'Unknown error');
        }
        if (response === 'user_not_found') {
            return error(404, 'User not found');
        }
        const response2 = await locals.adminRepository?.removeEditorFromClubs(userId, parsedClubIds.filter((id) => !parsedSelectedClubIds.includes(id)));
        if (response2 === 'unknown') {
            return error(500, 'Unknown error');
        }
        if (response2 === 'user_not_found') {
            return error(404, 'User not found');
        }

        return { success: true, message: 'Club moderation updated' };
    }
};

