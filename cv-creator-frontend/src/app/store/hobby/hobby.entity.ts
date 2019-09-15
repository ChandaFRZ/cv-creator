import { Auditable } from 'src/app/shared/models/auditable.modle';

export interface IHobbyEntity extends Auditable {
    id: number;
    name?: string;
    type?: number;
    position?: number;
    changes: any;
}

export class HobbyEntity extends Auditable implements IHobbyEntity {
    id: number;
    name: string;
    type: number;
    position: number;
    changes: any;

    constructor() {
        super();
        this.id = 0;
        this.type = -1;
        this.position = -1;
        this.name = 'add hobby';
    }
}

export function cloneHobbyEntity(entity: HobbyEntity): HobbyEntity {
    const newEntity = new HobbyEntity();
    newEntity.id = entity.id;
    newEntity.name = entity.name;
    newEntity.type = entity.type;
    newEntity.position = entity.position;
    newEntity.createdBy = entity.createdBy;
    newEntity.createdDate = entity.createdDate;
    newEntity.lastModifiedBy = entity.lastModifiedBy;
    newEntity.lastModifiedDate = entity.lastModifiedDate;
    newEntity.changes = entity.changes;
    return newEntity;
}
