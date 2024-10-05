import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { ClubRepository } from '$lib/clubs/club_repository';

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        

        return {
            club: await locals.clubRepository.getClub(params.id)
        };
    } catch (err) {
        console.error('Error loading club:', err);
        throw redirect(303, '/admin/dashboard');
    }
};

export const actions: Actions = {
    update: async ({ locals, request, params }) => {
        console.log('Updating club:', params.id);
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const description = data.get('description')?.toString();
        const memberCount = parseInt(data.get('memberCount')?.toString() || '0');

        const { data: { user } } = await locals.supabase.auth.getUser();

        if (!user) {
            throw redirect(303, 'admin/login');
        }

        try {
            const { error: updateError } = await locals.supabase
                .from('clubs')
                .update({
                    description: description,
                    name: name,
                    memberCount: memberCount,
                })
                .eq('id', params.id);

            if (updateError) throw updateError;

            return { success: true };
        } catch (error) {
            console.error('Error updating club:', error);
            return fail(500, { message: 'Failed to update club' });
        }
    },
    delete: async ({ locals, params }) => {
        console.log('Deleting club:', params.id);
        const { error: deleteError } = await locals.supabase
            .from('clubs')
            .delete()
            .eq('id', params.id);

        if (deleteError) {
            console.error('Error deleting club:', deleteError);
            return fail(500, { message: 'Failed to delete club' });
        }

        // delete files from storage
        const { error: deleteFilesError } = await locals.supabase
            .storage
            .from('laurianbucket')
            .remove([`${params.id}/*`]);

        if (deleteFilesError) {
            console.error('Error deleting files:', deleteFilesError);
            return fail(500, { message: 'Failed to delete files' });
        }

        throw redirect(303, '/admin/dashboard');
    }
};
