export interface IAddressEntity {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthLocation: string;
    street: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    createdBy?: string;
    createdDate?: number;
    lastModifiedBy?: string;
    lastModifiedDate?: number;
}

export class AddressEntity implements IAddressEntity {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthLocation: string;
    street: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    createdBy: string;
    createdDate: number;
    lastModifiedBy: string;
    lastModifiedDate: number;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.birthDate = '';
        this.birthLocation = '';
        this.street = '';
        this.zip = '';
        this.city = '';
        this.country = '';
        this.phone = '';
        this.email = '';
        this.createdDate = Date.now();
        this.createdBy = '';
        this.lastModifiedDate = Date.now();
        this.lastModifiedBy = '';
    }
}

export function cloneAddressEntity(addressEntity: AddressEntity): AddressEntity {
    const newAddress = new AddressEntity();
    newAddress.id = addressEntity.id;
    newAddress.firstName = addressEntity.firstName;
    newAddress.lastName = addressEntity.lastName;
    newAddress.birthDate = addressEntity.birthDate;
    newAddress.birthLocation = addressEntity.birthLocation;
    newAddress.street = addressEntity.street;
    newAddress.zip = addressEntity.zip;
    newAddress.city = addressEntity.city;
    newAddress.country = addressEntity.country;
    newAddress.phone = addressEntity.phone;
    newAddress.email = addressEntity.email;
    newAddress.createdDate = addressEntity.createdDate;
    newAddress.createdBy = addressEntity.createdBy;
    newAddress.lastModifiedDate = addressEntity.lastModifiedDate;
    newAddress.lastModifiedBy = addressEntity.lastModifiedBy;
    return newAddress;
}
