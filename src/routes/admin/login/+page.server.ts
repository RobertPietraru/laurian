import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { data: { session } } = await locals.supabase.auth.getSession();

    if (session) {
        throw redirect(303, '/admin/dashboard');
    }

    return {};
}) satisfies PageServerLoad;

export const actions = {
    login: async ({ locals, request }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (!email || !password) {
            return fail(400, { emailRequired: !email, passwordRequired: !password });
        }

        const { error } = await locals.supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return fail(500, { fail: true, message: error.message });
        }

        throw redirect(303, '/admin/dashboard');
    }
}