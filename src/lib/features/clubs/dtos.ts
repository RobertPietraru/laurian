import type { types } from "$lib/types";
export interface UpdateClubParams {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    filesToUpload: File[];
    filesLeft: string[];
    initialFiles: string[];
}
export interface CreateClubParams {
    name: string;
    description: string;
    memberCount: number;
    files: File[];
}

export type ClubDto = types.Tables<'clubs'>;
export type ClubEditorDto = types.Tables<'club_editors'>;
export type CreateClubDto = Omit<ClubDto, "created">;