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
