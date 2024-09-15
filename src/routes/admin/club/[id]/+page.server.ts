import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { clubFromJson } from '$lib/models/club';

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        const { data: club, error: supabaseError } = await locals.supabase
            .from('clubs')
            .select('*')
            .eq('id', params.id)
            .single();

        if (supabaseError) throw error(404, 'Club not found');
        return {
            club: clubFromJson(club, env.SUPABASE_URL)
        };
    } catch (err) {
        console.error('Error loading club:', err);
        throw redirect(303, '/admin/dashboard');
    }
};

export const actions: Actions = {
    default: async ({ locals, request, params }) => {
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
    }
};
