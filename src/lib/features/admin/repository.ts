import type { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "$lib/stores/logger";
import { type AppUser } from "$lib/features/auth/models";
import type { ClubEditorDto } from "../clubs/dtos";
import type { AdminClub } from "./models";
import type { Club } from "../clubs/models";

export class AdminRepository {
    constructor(private readonly supabase: SupabaseClient) {
        this.supabase = supabase;
    }
    async getUserById(userId: string): Promise<AppUser | null> {
        const { data, error } = await this.supabase.from('users').select('*, roles!inner(*)').eq('id', userId).single();
        if (error) {
            logger.error("Error getting user: ", error);
            return null;
        }
        return { ...data, role: data.roles.name } as AppUser;
    }
    async getAllClubs(): Promise<AdminClub[] | null> {
        const { data, error } = await this.supabase.from('clubs').select('id, name');
        if (error) {
            logger.error("Error getting clubs: ", error);
            return null;
        }
        return data;
    }
    async getAllClubsWithEditor(editorId: string): Promise<string[] | null> {
        const { data, error } = await this.supabase.from('club_editors').select('club').eq('user', editorId);

        if (error) {
            logger.error("Error getting clubs: ", error);
            return null;
        }
        return data.map((club) => club.club);
    }

    async addEditorToClubs(userId: string, clubIds: string[]): Promise<'unknown' | 'user_not_found' | null> {
        if (clubIds.length === 0) {
            return null;
        }
        var parsedUserId: number;
        try {
            parsedUserId = parseInt(userId);
        } catch (error) {
            logger.error(`Error parsing user ID: ${error}`);
            return 'user_not_found';
        }
        const { error } = await this.supabase.from('club_editors').upsert(
            clubIds.map((clubId) => ({
                id: parsedUserId.toString() + clubId,
                user: parsedUserId,
                club: clubId
            })),
        );
        if (error) {
            logger.error(`Error assigning editor to clubs: ${error}`);
            return 'unknown';
        }
        return null;
    }
    async removeEditorFromClubs(userId: string, clubIds: string[]): Promise<'unknown' | 'user_not_found' | null> {
        var parsedUserId: number;
        try {
            parsedUserId = parseInt(userId);
        } catch (error) {
            logger.error(`Error parsing user ID: ${error}`);
            return 'user_not_found';
        }
        const { error } = await this.supabase.from('club_editors').delete().in('club', clubIds).eq('user', parsedUserId);
        if (error) {
            logger.error(`Error removing editor from clubs: ${error}`);
            return 'unknown';
        }
        return null;
    }

    async makeModerator(userId: string): Promise<'unknown' | null> {
        const { error } = await this.supabase.from('users').update({ role: 3 }).eq('id', userId);
        if (error) {
            logger.error(`Error making moderator: ${error}`);
            return 'unknown';
        }
        return null;
    }

    async removeModerator(userId: string): Promise<'unknown' | null> {
        const { error } = await this.supabase.from('users').update({ role: 2 }).eq('id', userId);
        if (error) {
            logger.error(`Error removing moderator: ${error}`);
            return 'unknown';
        }
        const { error: error2 } = await this.supabase.from('club_editors').delete().eq('user', userId);
        if (error2) {
            logger.error(`Error removing editor from clubs: ${error2}`);
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
        const { data, error } = await this.supabase.from('users').select('*, roles!inner(*)').range((page - 1) * pageSize, page * pageSize);

        if (error) {
            logger.error(`Error getting users: ${error}`);
            return null;
        }
        return { users: data.map((user) => ({ ...user, role: user.roles.name })) as AppUser[], index: (page - 1) * pageSize, lastIndex: page * pageSize + data.length, total: data.length, usersLeft: 0 };
    }


}
