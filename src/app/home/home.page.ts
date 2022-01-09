import { Component } from '@angular/core';

import { Contact } from '../interfaces/contacts.interface';
import { CONTACTS } from '../mocks/contacts.mock';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contacts: Contact[] = CONTACTS;
  contactsSelected: Contact[] = [];

  constructor() {}

  onClickData(event: any): void {
    console.log(event)
  }

  onDataClicked(event: any): void {
    this.contactsSelected = event;
  }

  onDataListRemove(event: any): void {
    if (event.length > 0) {
      this.contacts = this.contacts.filter((contact: Contact) => {
        return event.indexOf(contact) == -1;
      });
    }
  }
}
