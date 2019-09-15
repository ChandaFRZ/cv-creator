import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { ValidationData } from 'src/app/shared/interfaces/validation-data.interface';
import { AddressEntity, cloneAddressEntity } from 'src/app/store/address/address.entity';
import * as AddressActions from './../../store/address/address.actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  address: AddressEntity = new AddressEntity();
  errors: ValidationData[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.errors = [];

    this.store.select(state => state.addresState.address).subscribe(
      (address: AddressEntity) => {
        if (address != null) {
          this.errors = [];
          this.address = cloneAddressEntity(address);
        }
      });
  }

  onSubmit() {
    if (this.errors.length <= 0) {
      console.log('submit');
      this.store.dispatch(AddressActions.updateRequest({ model: this.address }));
    }
  }

  checkLength(ref: any): boolean {
    return ref.value.length > 0;
  }

  onValidation(data: ValidationData) {
    const foundData = this.errors.find(item => item.id === data.id);
    if (!data.valid) {
      if (foundData === undefined) {
        this.errors.push(data);
      }
    } else {
      this.errors = this.errors.filter(item => item.id !== data.id);
    }
  }
}
