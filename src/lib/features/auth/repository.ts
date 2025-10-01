import type { SupabaseClient } from "@supabase/supabase-js";
import { userFromJson, userRoles, type AppUser, type AppUserRole } from "./models";

import { logger } from '$lib/stores/logger';
import type { types } from "$lib/types";
import type { AppUserDto } from "../clubs/dtos";

export class AuthRepository {
    constructor(private readonly supabase: SupabaseClient, private readonly supabaseUrl: string) {
        this.supabase = supabase;
        this.supabaseUrl = supabaseUrl;

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
            logger.error({error}, "Error signing in");
            return "unknown_error";
        }
        return null;
    }
    async getUser(): Promise<AppUser | null> {
        const { data, error } = await this.supabase.auth.getUser();

        if (error || !data.user) {
            if (error) {
                logger.error({error}, "Error getting user 1");
            }
            return null;
        }
        const authUser = data.user;
        const { data: userData, error: userError } = await this.supabase.from("users").select('*, roles!inner(*)').eq("auth", authUser.id);
        
        if (userError || userData.length == 0 || !userData[0].roles) {
            console.log(userError);
            logger.error({userError}, "Error getting user");
            return null;
        }
        const role = userData[0]?.roles?.name;
        if (!userRoles.includes(role)) {
            logger.error({role}, "User role not found");
            return null;
        }
        userData[0].role = role as AppUserRole;
        const user = userData[0] as AppUserDto;
        return userFromJson(user, role, this.supabaseUrl);
    }
    async modifyProfile(params: {
        name: string | undefined,
        description: string | undefined,
        image: File | undefined,
    }): Promise<"unknown_error" | null> {
        const user = await this.getUser();
        if (!user) {
            return "unknown_error";
        }

        var fileName: string | undefined = undefined;
        if (params.image) {
            const name = `${crypto.randomUUID()}_${params.image.name}`;
            const { error: uploadError } = await this.supabase.storage
                .from('laurianbucket')
                .upload(`${user.id}/${name}`, params.image);

            if (uploadError) {
                logger.error({uploadError}, "Error uploading file");
                return "unknown_error";
            }
            fileName = name;
        }
        const table: Partial<types.Tables<"users">> = {}
        if (params.name) {
            table.name = params.name;
        }
        if (params.description) {
            table.description = params.description;
        }
        if (fileName) {
            table.image = fileName;
        }

        const { error: updateError } = await this.supabase.from("users").update(table).eq('id', user.id);
        if (updateError) {
            logger.error({updateError}, "Error modifying profile");
            return "unknown_error";
        }

        return null;
    }
    async signUp(email: string, password: string, name: string): Promise<"email_taken" | "unknown_error" | null> {
        const { error } = await this.supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            if (error.code === "user_already_exists") {
                return "email_taken";
            }
            if (error.status === 400) {
                return "unknown_error";
            } else if (error.status === 422) {
                return "email_taken";
            }
            logger.error({error}, "Error signing up");
            return "unknown_error";
        }

        const { data: userData, error: userError } = await this.supabase.auth.getUser();
        if (!userData) {
            logger.error({userData}, "SIGNUP ERROR getting user");
            return "unknown_error";
        }
        if (userError) {
            logger.error({userError}, "SIGNUP ERROR getting user");
            return "unknown_error";
        }

        const { data, error: insertUserError } = await this.supabase.from("users").insert({
            name,
            auth: userData.user.id,
            email: userData.user.email,
            role: 2,
        });

        if (insertUserError) {
            /// logout

            logger.error({insertUserError}, "Error creating user");
            try {

                await this.supabase.auth.signOut();
            } catch (error) {
                logger.error({error}, "Error signing out");
                return "unknown_error";
            }

            return "unknown_error";
        }

        return null;
    }
    async getAllModerators(): Promise<AppUser[] | null> {
        const { data, error } = await this.supabase
            .from('users')
            .select('*, roles!inner(*)')
            .not('team_role', 'is', null);

        if (error) {
            logger.error({error}, "Error getting moderators");
            return null;
        }
        return data.map((user) => userFromJson(user, user.roles.name, this.supabaseUrl));
    }
}
