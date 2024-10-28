import { error, fail } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
    const user = await locals.authRepository.getUser();

    if (user === null) {
        return error(500, 'Ceva nu a mers bine');
    }

    return { user };
});

export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const name = data.get('name') as string | undefined;
        const description = data.get('description') as string | undefined;
        const image = data.get('image') as File | undefined;
        const result = await locals.authRepository.modifyProfile({ name, description, image: image?.name ? image : undefined });
        if (result === "unknown_error") {
            return fail(500, { message: 'Ceva nu a mers bine' });
        }
        return { success: result === null, message: null };
    }
}

