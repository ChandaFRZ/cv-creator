import { Auditable } from 'src/app/shared/models/auditable.modle';

export interface IKnowledgeEntity extends Auditable {
    id: number;
    type?: number;
    position?: number;
    year?: string;
    header?: string;
    content?: string;
    changes?: any;
}

export class KnowledgeEntity extends Auditable implements IKnowledgeEntity {
    id: number;
    type: number;
    position: number;
    content: string;
    changes: any;

    constructor() {
        super();
        this.id = 0;
        this.type = -1;
        this.position = -1;
        this.content = 'add knowledge';
    }
}

export function cloneKnowledgeEntity(entity: KnowledgeEntity): KnowledgeEntity {
    const newEntity = new KnowledgeEntity();
    newEntity.id = entity.id;
    newEntity.type = entity.type;
    newEntity.position = entity.position;
    newEntity.content = entity.content;
    newEntity.createdBy = entity.createdBy;
    newEntity.createdDate = entity.createdDate;
    newEntity.lastModifiedBy = entity.lastModifiedBy;
    newEntity.lastModifiedDate = entity.lastModifiedDate;
    newEntity.changes = entity.changes;
    return newEntity;
}
