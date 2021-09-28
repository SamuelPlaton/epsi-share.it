interface Data{
    id : string;
    path : string;
    user : string;
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
