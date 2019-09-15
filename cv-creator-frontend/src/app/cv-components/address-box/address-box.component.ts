import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { cloneAddressEntity, AddressEntity } from 'src/app/store/address/address.entity';

@Component({
  selector: 'app-address-box',
  templateUrl: './address-box.component.html',
  styleUrls: ['./address-box.component.scss']
})
export class AddressBoxComponent implements OnInit {

  address: AddressEntity;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(state => state.addresState.address).subscribe(
      (address: AddressEntity) => {
        this.address = address;
      });
  }
}
