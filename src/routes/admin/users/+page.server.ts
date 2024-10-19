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
