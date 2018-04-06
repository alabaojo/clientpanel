import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

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
        if ( client != null) {
        if (client.balance > 0) {
           this.hasBalance = true;
         }
       }
      this.client = client;
      console.log(this.client);
    });
  }
  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
  }
  onDeleteClick()  {
    if (confirm('are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Balance removed', {
        cssClass: 'alert-success', timeout: 400
      });
      this.router.navigate(['/']);
    }
  }
}
