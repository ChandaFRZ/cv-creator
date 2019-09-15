import { Auditable } from 'src/app/shared/models/auditable.modle';

export interface IProgressionEntity extends Auditable {
    id: number;
    type?: number;
    position?: number;
    year?: string;
    header?: string;
    description?: string;
    changes: any;
}

export class ProgressionEntity extends Auditable implements IProgressionEntity {
    id: number;
    type: number;
    position: number;
    year: string;
    header: string;
    description: string;
    changes: any;

    constructor() {
        super();
        this.id = 0;
        this.type = -1;
        this.position = -1;
        this.year = '2000 - 2010';
        this.header = 'header text';
        this.description = 'description text';
    }
}

export function cloneProgressionEntity(entity: ProgressionEntity): ProgressionEntity {
    const newEntity = new ProgressionEntity();
    newEntity.id = entity.id;
    newEntity.type = entity.type;
    newEntity.position = entity.position;
    newEntity.year = entity.year;
    newEntity.header = entity.header;
    newEntity.description = entity.description;
    newEntity.createdBy = entity.createdBy;
    newEntity.createdDate = entity.createdDate;
    newEntity.lastModifiedBy = entity.lastModifiedBy;
    newEntity.lastModifiedDate = entity.lastModifiedDate;
    newEntity.changes = entity.changes;
    return newEntity;
}

