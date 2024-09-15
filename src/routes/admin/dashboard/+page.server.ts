import { env } from '$env/dynamic/private';
import { clubFromJson } from '$lib/models/club';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    try {
        const { data: clubs, error } = await locals.supabase
            .from('clubs')
            .select('*')
            .order('created', { ascending: false });

        if (error) throw error;

        return {
            clubs: clubs.map(club => clubFromJson(club, env.KV_SUPABASE_URL))
        };
    } catch (error) {
        console.error('Error fetching clubs:', error);
        return {
            clubs: []
        };
    }
};
