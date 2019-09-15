import { Auditable } from 'src/app/shared/models/auditable.modle';

export interface IImageEntity extends Auditable {
    id?: number;
    imageType?: ImageType;
    name?: string;
    extension?: string;
    thumbnail?: boolean;
    changes?: any;
    url?: string;
}

export class ImageEntity extends Auditable implements IImageEntity {
    id?: number;
    imageType?: ImageType;
    name?: string;
    extension?: string;
    thumbnail?: boolean;
    url: string;
    changes?: any;

    constructor() {
        super();
    }
}

export enum ImageType {
    user = 1,
    avatar = 2,
    background = 3,
    logo = 4
}
