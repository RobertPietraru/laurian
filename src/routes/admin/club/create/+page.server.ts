import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '../../club/create/$types';

export const actions: Actions = {
    default: async ({ locals, request, cookies }) => {
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

        const { data: { user } } = await locals.supabase.auth.getUser();

        if (!user) {
            throw redirect(303, 'admin/login');
        }
        console.log('retrieved user info')

        var clubRecordId: string
        try {
            console.log('creating record')
            const { data: clubRecord, error } = await locals.supabase
                .from('clubs')
                .insert({
                    id: crypto.randomUUID(),
                    description,
                    name,
                    memberCount,
                    files: files.map(file => file.name)  // Store file names in the database
                })
                .select()
                .single();

            if (error) throw error;
            clubRecordId = clubRecord.id

            console.log('Created club record');

            // Upload files to storage
            for (const file of files) {
                const { error: uploadError } = await locals.supabase.storage
                    .from('laurianbucket')
                    .upload(`${clubRecordId}/${file.name}`, file);

                if (uploadError) {
                    console.error('Error uploading file:', uploadError);
                    // You might want to handle this error, perhaps by deleting the club record
                    // and returning a failure response
                }
            }

            console.log('Uploaded files');

        } catch (error) {
            console.log('error', error);
            return fail(500, { message: 'Failed to create club' });
        }
        throw redirect(303, `/admin/club/${clubRecordId}`);
    }
}