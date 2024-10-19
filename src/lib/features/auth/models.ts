
 const  userRoles =  ["admin" , "moderator" , "user"] as const;
 export type AppUserRole = typeof userRoles[number];

export interface AppUser {
    id: string
    email: string
    name: string
    role: AppUserRole,
}
