import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { clubFromJson } from '$lib/models/club';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
    const { data: club, error: supabaseError } = await locals.supabase
        .from('clubs')
        .select('*')
        .eq('id', params.id)
        .single();

    if (supabaseError) {
        console.error('Error fetching club:', supabaseError);
        throw error(404, 'Club not found');
    }

    if (!club) {
        throw error(404, 'Club not found');
    }

    return {
        club: clubFromJson(club, env.KV_SUPABASE_URL)
    };
}) satisfies PageServerLoad;
