interface User {
    id : string;
    name : string;
    token : string;
    identifiant : string;
    email : string;
    status : UserStatus;
    createdAt : Date;
}

export enum UserStatus {
    NOT_CONFIRMED = 'not-confirmed',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}
