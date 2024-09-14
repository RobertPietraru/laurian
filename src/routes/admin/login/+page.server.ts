import { fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (locals.pb.authStore.model) {
        return redirect(303, '/admin/dashboard')
    }

    return {};
}) satisfies PageServerLoad;

export const actions = {
    login: async ({ locals, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        console.log('validation');

        if (!email || !password) {
            return fail(400, { emailRequired: email === null, passwordRequired: password === null });
        }

        try {
            console.log('authWithPassword');
            await locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
            console.log('redirect');
        } catch (error) {
            console.log('error');
            const errorObj = error as ClientResponseError;
            console.log(errorObj);
            return fail(500, { fail: true, message: errorObj.data.message });
        }

        throw redirect(303, '/admin/dashboard');
    }
}