import { fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError, RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const actions = {
    default: async ({ locals, request }) => {
        console.log('starting submission')
        console.log('parsing form data')
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const description = data.get('description')?.toString();
        const memberCount = parseInt(data.get('memberCount')?.toString() || '0');
        const files = [];

        for (let [key, value] of data.entries()) {
            if (value instanceof File) {
                files.push(value);
            }
        }

        console.log('parsed form data')
        const userId = locals.pb.authStore.model?.id;

        if (!userId) {
            throw redirect(300, '/login');
        }
        console.log('retrieved user info')

        let clubRecord: RecordModel;
        try {
            console.log('creating record')
            clubRecord = await locals.pb.collection('clubs').create(
                {
                    'files': files,
                    'description': description,
                    'name': name,
                    'memberCount': memberCount,
                    'creator': userId,
                }
            );

            console.log('Created club record');
        
        } catch (error) {
            console.log('error', error);
            return fail(500);
        }

        throw redirect(300, `/admin/club/${clubRecord.id}`);
    }
}