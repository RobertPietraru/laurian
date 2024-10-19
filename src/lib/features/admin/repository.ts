import type { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "$lib/stores/logger";
import { type AppUser } from "$lib/features/auth/models";

export class AdminRepository {
    constructor(private readonly supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    async makeModerator(userId: string): Promise<'unknown' | null> {
        const { data, error } = await this.supabase.from('users').update({ role: 3 }).eq('id', userId);
        if (error) {
            logger.error("Error making moderator: ", error);
            return 'unknown';
        }
        return null;
    }
    async removeModerator(userId: string): Promise<'unknown' | null> {
        const { data, error } = await this.supabase.from('users').update({ role: 2 }).eq('id', userId);
        if (error) {
            logger.error("Error removing moderator: ", error);
            return 'unknown';
        }
        return null;
    }
    /**
     * Get all users with pagination
     * @param page - The page number to get - starts at 1
     * @param pageSize - The number of users to get per page
     * @returns - The users, the index of the first user, the index of the last user, the total number of users, and the number of users left
     */
    async getAllUsersWithPagination(page: number, pageSize: number): Promise<{ users: AppUser[], index: number, lastIndex: number, total: number, usersLeft: number } | null> {
        const { data, error} = await this.supabase.from('users').select('*, roles!inner(*)').range((page - 1) * pageSize, page * pageSize);

        if (error) {
            logger.error("Error getting users: ", error);
            return null;
        }
        return { users: data.map((user) => ({ ...user, role: user.roles.name })) as AppUser[], index: (page - 1) * pageSize, lastIndex: page * pageSize + data.length, total: data.length, usersLeft: 0 };
    }


}
