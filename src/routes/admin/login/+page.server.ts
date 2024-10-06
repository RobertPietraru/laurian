import { fail, redirect } from '@sveltejs/kit';
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

        const error = await locals.authRepository.signIn(email, password);

        if (error) {
            if (error === "wrong_credentials" ){
                return fail(400, {message: "Email sau parolă incorecte"});
            }
            return fail(500, {message: "Eroare necunoscută"});
        }

        throw redirect(303, '/admin/dashboard');
    }
}