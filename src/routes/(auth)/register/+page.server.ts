import { logger } from '$lib/stores/logger';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
    const { data: { session } } = await locals.supabase.auth.getSession();

    if (session) {
        throw redirect(303, '/discover');
    }

    return {};
});

export const actions = {
    register: async ({ locals, request }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const name = data.get('name')?.toString();

        if (!email || !password || !name) {
            return fail(400,
                {
                    email: email,
                    password: password,
                    name: name,
                    message: null,
                }
            );
        }

        if (password.length < 8) {
            return fail(400, { message: "Parola trebuie să conțină minim 8 caractere", email: email, password: password, name: name });
        }

        const error = await locals.authRepository.signUp(email, password, name);

        if (error) {
            if (error === "email_taken") {
                return fail(400, { message: "Adresa de email este deja înregistrată", email: email, password: password, name: name });
            }
            return fail(500, { message: "Eroare necunoscută", email: email, password: password, name: name });
        }

        throw redirect(303, '/login');
    }
}