import { error } from '@sveltejs/kit';

export const load = (async ({ locals, url }) => {
    const page = parseInt(url.searchParams.get('page') || '1');
    const response = await locals.adminRepository?.getAllUsersWithPagination(page, 10);
    if (!response) {
        error(500, {
            message: 'Eroare interna',
        });
    }
    return {
        ...response,
    };
});

export const actions = {
    makeModerator: async ({ request, locals }) => {
        const formData = await request.formData();
        const userId = formData.get('userId') as string | null;
        if (!userId) {
            error(400, {
                message: 'Id-ul utilizatorului este necesar',
            });
        }
        const response = await locals.adminRepository?.makeModerator(userId);
        if (response === 'unknown') {
            error(500, {
                message: 'Eroare interna',
            });
        }

        return {
            success: true,
            message: 'Moderator facut',
            response,
        };
    },
    removeModerator: async ({ request, locals }) => {
        const formData = await request.formData();
        const userId = formData.get('userId') as string | null;
        if (!userId) {
            error(400, {
                message: 'Id-ul utilizatorului este necesar',
            });
        }
        const response = await locals.adminRepository?.removeModerator(userId);
        if (response === 'unknown') {
            error(500, {
                message: 'Eroare interna',
            });
        }

        return {
            success: true,
            message: 'Moderator scos',
            response,
        };
    },
};  
