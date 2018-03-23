import { Component, OnInit, ViewChild } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnAdd = true; // ensure no balance when new client is added
  @ViewChild('clientForm') form: any;


  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit({ value, valid}: {value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value .balance = 0;
    }
    if (!valid) {
      // show error
      this.flashMessage.show('Please fill out the form correctly',
       { cssClass: 'alert-danger', timeout: 5000 });
    } else {
      // add client
      this.clientService.newClient(value);
      // show message
      this.flashMessage.show('New client added',
       { cssClass: 'alert-success', timeout: 5000 });
      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }

}