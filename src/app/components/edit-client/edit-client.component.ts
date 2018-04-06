import { Component, OnInit } from '@angular/core';


import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../models/Client';
// import { flashMessagesModule } from 'angular2-flash-messages/module/module';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnAdd = true; // ensure no balance when new client is added
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
        // get id from url
        this.id = this.route.snapshot.params['id'];
        // get Client
        this.clientService.getClient(this.id).subscribe(client => {
          this.client = client;
          console.log(this.client);
        });
  }
  // the type of 'Client' but for shadow var warning
  onSubmit({value, valid}: {value: Client, valid: boolean} ) {
    if (!valid) {
      // show error
      this.flashMessage.show('Please fill out the form correctly',
       { cssClass: 'alert-danger', timeout: 5000 });
    } else {
      // add id to client
      value.id = this.id;
      // update client
      this.clientService.newClient(value);
      // show message
      this.flashMessage.show('New client added',
       { cssClass: 'alert-success', timeout: 5000 });
      // redirect to home
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
