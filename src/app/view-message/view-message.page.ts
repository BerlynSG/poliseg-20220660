import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { DataService, Incident } from '../services/data.service';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public incident!: Incident;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {}

  ngOnInit() {
    this.setEventData();
  }

  async setEventData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.incident = await this.data.getIncidentById(parseInt(id, 10));
    const readFile = await Filesystem.readFile({
      path: this.incident.photo.filepath,
      directory: Directory.Data,
    });
    this.incident.photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }
}
