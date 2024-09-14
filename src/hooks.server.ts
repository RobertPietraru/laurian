import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private'
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authentication: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(env.PB_URL);

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}

export const authorization: Handle = async ({ event, resolve }) => {
    // Protect any routes that don't start with the unprotectedPrefix or are not the root path
    if (event.url.pathname.startsWith('/admin') && !event.url.pathname.startsWith('/admin/login')) {
        const model = event.locals.pb.authStore.model;
        if (!model) {
            throw redirect(303, '/admin/login');
        }
    }

    // If the request is still here, just proceed as normally
    const result = await resolve(event);
    return result;
};

export const handle = sequence(authentication, authorization)
