export interface IUserRole {
    id: number;
    name: string;
}

export class UserRole implements IUserRole {
    id: number;
    name: string;

    constructor(userRole: IUserRole) {
        this.id = userRole.id;
        this.name = userRole.name;
    }
}
