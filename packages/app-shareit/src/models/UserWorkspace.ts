export interface UserWorkspace{
    id : string;
    user : string;
    workspace : string;
    status : UserWorkspaceStatus;
    createdAt : Date;
}

export enum UserWorkspaceStatus {
    ADMIN = 'admin',
    GUEST = 'guest',
}
