import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddEventPage } from './add-event.page';

import { IonicModule } from '@ionic/angular';

import { AddEventPageRoutingModule } from './add-event-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEventPageRoutingModule
  ],
  declarations: [AddEventPage]
})
export class AddEventPageModule {}
