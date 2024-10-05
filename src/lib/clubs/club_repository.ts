import type { SupabaseClient } from "@supabase/supabase-js";
import * as models from "./models";


export class ClubRepository {
    private supabase: SupabaseClient;
    private supabaseUrl: string;

    constructor(supabase: SupabaseClient, supabaseUrl: string) {
        this.supabase = supabase;
        this.supabaseUrl = supabaseUrl;
    }

    async getClub(id: string): Promise<models.Club | "not_found"| null> {
        const { data: club, error: supabaseError } = await this.supabase
            .from('clubs')
            .select('*')
            .eq('id', id)
            .single();

        if (supabaseError) {
            // if the error is a 404, return "not_found"
            if (supabaseError.code === 'PGRST116') {
                return "not_found";
            }
            console.error('Error fetching club:', supabaseError);
            return null;
        }
        return models.clubFromJson(club, this.supabaseUrl);
    }

    async getClubs(page: number, batch: number): Promise<models.Club[] | null> {
        const { data: clubs, error } = await this.supabase
            .from('clubs')
            .select('*')
            .order('created', { ascending: false })
            .limit(50);

        if (error) {
            console.error('Error fetching clubs:', error);
            return null;
        }
        return clubs.map(club => models.clubFromJson(club, this.supabaseUrl));
    }

    async createClub() {
        throw new Error('Not implemented');
    }

    async updateClub() {
        throw new Error('Not implemented');
    }
}