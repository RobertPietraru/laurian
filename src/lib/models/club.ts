import type { RecordModel } from "pocketbase";

export interface Club {
    id: string;
    created: Date;
    name: string;
    description: string;
    files: string[];
    memberCount: number;
    creator: string;
}

export function clubFromRecord(item: RecordModel, pb_url: string): Club {
    return {
        id: item.id,
        created: new Date(item.created),
        name: item.name,
        description: item.description,
        memberCount: item.memberCount,
        creator: item.creator,
        files: ((item.files) || []).map((file: any) => {
            return `${pb_url}/api/files/clubs/${item.id}/${file}`;
        }),
    };
}