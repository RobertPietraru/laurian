import { error, redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    const user = await locals.authRepository.getUser();

    if (user == null || user.role !== 'moderator') {
        throw redirect(302, '/discover');
    }
    const clubs = await locals.clubRepository.getClubsForEditor(user.id);
    if (clubs == null) {
        return error(500, "Ceva nu a mers bine");
    }
    return {
        user,
        clubs
    }
};
