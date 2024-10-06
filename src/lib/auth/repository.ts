import type { SupabaseClient } from "@supabase/supabase-js";

export class AuthRepository {
    constructor(private readonly supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    async signIn(email: string, password: string): Promise<"wrong_credentials" | "unknown_error" | null> {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error("Error signing in: ", error);
            return "unknown_error";
        }
        return null;
    }
}
