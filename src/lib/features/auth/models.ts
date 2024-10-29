import type { AppUserDto } from "../clubs/dtos";

export const userRoles = ["admin", "moderator", "user"] as const;
export type AppUserRole = typeof userRoles[number];



export interface AppUser {
    id: string
    email: string
    name: string
    role: AppUserRole,
    image: string | null
    description: string | null
    teamRole: string | null
}


export function userFromJson(item: AppUserDto, role: AppUserRole, supabaseUrl: string): AppUser {
    return {
        id: item.id.toString(),
        name: item.name,
        description: item.description,
        image: item.image ?
            `${supabaseUrl}/storage/v1/object/public/laurianbucket/${item.id}/${item.image}`
            : null,
        email: item.email ?? "",
        role: role,
        teamRole: item.team_role
    };
}