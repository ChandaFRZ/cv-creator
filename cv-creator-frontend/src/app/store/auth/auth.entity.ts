import { UserRole } from './../../shared/models/user-role.model';
import { Auditable } from 'src/app/shared/models/auditable.modle';
export interface IAuthEntity extends Auditable {
    email: string;
    enabled: boolean;
    tokenExpired: boolean;
    pageTitle: string;
    roles: UserRole[];
}

