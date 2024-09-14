import { json } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export async function POST(event) {
    try {

        event.locals.pb.authStore.clear();
        return json({
            code: 200,
            status: 'success',
        });
    } catch (error) {
         const errorObj = error as ClientResponseError;
        return json({
            code: 500,
            status: 'error',
            error: errorObj.data.message,
        });

    }
}