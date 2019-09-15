export class Auditable {
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;

    constructor() {
        this.createdBy = null;
        this.createdDate = null;
        this.lastModifiedBy = null;
        this.lastModifiedDate = null;
    }
}
