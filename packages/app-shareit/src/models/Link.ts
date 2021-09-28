export interface Link{
    id : string;
    data : string;
    createdAt : string;
    expirationDate : string;
    maxUsages : number;
    usages : string;
    status : Status;
}

export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}
