import type { ClubDto } from "./dtos";

export interface Club {
    id: string;
    created: Date;
    name: string;
    description: string;
    files: string[];
    memberCount: number;
}

export function clubFromJson(item: ClubDto, supabaseUrl: string): Club {
    return {
        id: item.id,
        created: new Date(item.created),
        name: item.name,
        description: item.description,
        memberCount: item.memberCount,
        files: item.files ? item.files.map((file: string) =>
            `${supabaseUrl}/storage/v1/object/public/laurianbucket/${item.id}/${file}`
        ) : [],
    };
}