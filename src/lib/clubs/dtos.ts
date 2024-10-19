import type { types } from "$lib/types";
export interface UpdateClubParams {
    id: string;
    name: string;
    description: string;
    memberCount: number;
}
export interface CreateClubParams {
    name: string;
    description: string;
    memberCount: number;
    files: File[];
}

export type ClubDto = types.Tables<'clubs'>;