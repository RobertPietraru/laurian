import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppUser, AppUserRole } from "./models";

import { logger } from '$lib/stores/logger';

export class AuthRepository {
    constructor(private readonly supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    async signIn(email: string, password: string): Promise<"wrong_credentials" | "unknown_error" | null> {
        const { error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            if (error.status === 400) {
                return "wrong_credentials";
            }
            logger.error("Error signing in: ", error);
            return "unknown_error";
        }
        return null;
    }
    async getUser(): Promise<AppUser | null> {
        const { data, error } = await this.supabase.auth.getUser();

        if (error || !data.user) {
            if (error) {
                logger.error("Error getting user 1: ", error);
            }
            return null;
        }
        const authUser = data.user;
        const { data: userData, error: userError } = await this.supabase.from("users").select("*").eq("auth", authUser.id);

        if (userError) {
            logger.error("Error getting user: ", userError);
            return null;
        }
        const user = userData[0] as Partial<AppUser>;
        const { data: roleData, error: roleError } = await this.supabase.from("user_roles").select("*").eq("user", user.id);
        if (roleError) {
            return null;
        }
        const role = roleData[0].role as number;
        if (role == 1) {
            user.role = 'admin' satisfies AppUserRole;
        } else if (role == 2) {
            user.role = 'user' satisfies AppUserRole;
        } else if (role == 3) {
            user.role = 'moderator' satisfies AppUserRole;
        }

        return user as AppUser;
    }
    async signUp(email: string, password: string, name: string): Promise<"email_taken" | "unknown_error" | null> {
        const { error } = await this.supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            if (error.status === 400) {
                logger.error("error", error);
                return "email_taken";
            } else if (error.status === 422) {
                logger.error("error", error);
                return "email_taken";
            }
            logger.error("Error signing up: ", error);
            return "unknown_error";
        }

        const { data: userData, error: userError } = await this.supabase.auth.getUser();
        if (!userData) {
            logger.error("SIGNUP ERROR getting user");
            return "unknown_error";
        }
        if (userError) {
            logger.error("SIGNUP ERROR getting user", userError);
            return "unknown_error";
        }

        const { data, error: insertUserError } = await this.supabase.from("users").insert({
            name,
            auth: userData.user.id,
        });

        if (insertUserError) {
            logger.error("Error creating user: ", insertUserError);
            return "unknown_error";
        }

        const { data: userInfo, error: userInfoError } = await this.supabase.from("users").select("*").eq("auth", userData.user.id);


        if (userInfoError || !userInfo) {
            logger.error("Error getting user: ", userInfoError);
            return null;
        }
        const user = userInfo[0];

        /// create user_role entry
        const { data: userRoleData, error: userRoleError } = await this.supabase.from("user_roles").insert({
            user: (user as Partial<AppUser>).id,
            role: 2,
        });

        if (userRoleError) {
            logger.error("Error creating user role: ", userRoleError);
            return "unknown_error";
        }
        return null;
    }
}
