export interface Data{
    id : string;
    content: string;
    path : string;
    user : string;
    name: string;
    type : DataStatus;
    parent : string;
    workspace? : string;
}

export enum DataStatus {
    FOLDER = 'folder',
    FILE = 'file',
    IMAGE = 'image',
    VIDEO = 'video',
}
