import { Auditable } from 'src/app/shared/models/auditable.modle';

export interface IExperienceEntity extends Auditable {
    id: number;
    type?: number;
    position?: number;
    year?: string;
    header?: string;
    description?: string;
    changes: any;
}

export class ExperienceEntity extends Auditable implements IExperienceEntity {
    id: number;
    type: number;
    position: number;
    header: string;
    description: string;
    changes: any;

    constructor() {
        super();
        this.id = 0;
        this.type = -1;
        this.position = -1;
        this.header = 'add title';
        this.description = 'add description';
    }
}

export function cloneExperienceEntity(entity: ExperienceEntity): ExperienceEntity {
    const newEntity = new ExperienceEntity();
    newEntity.id = entity.id;
    newEntity.type = entity.type;
    newEntity.position = entity.position;
    newEntity.header = entity.header;
    newEntity.description = entity.description;
    newEntity.createdBy = entity.createdBy;
    newEntity.createdDate = entity.createdDate;
    newEntity.lastModifiedBy = entity.lastModifiedBy;
    newEntity.lastModifiedDate = entity.lastModifiedDate;
    return newEntity;
}
