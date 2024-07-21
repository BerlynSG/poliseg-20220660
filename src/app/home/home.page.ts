import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message, Incident } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public incidents!: Incident[]
  private data = inject(DataService);
  constructor() {
    this.updateEventList();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
    this.updateEventList();
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  async updateEventList(){
    this.incidents = await this.data.getIncidents()
  }
}
