import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Photo } from '@capacitor/camera';

import { DataService, Incident } from '../services/data.service';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  public error!: string;

  public title!: string;
  public description!: string;
  public photo!: Photo;
  public recording_state: number = 0;


  public incident!: Incident;
  private data = inject(DataService);
  private platform = inject(Platform);

  constructor(public photoService: PhotoService, private router: Router, private audioService: AudioService) {}

  ngOnInit() {}

  async addEvent() {
    if (this.title == "" || this.description == "" || this.photo == null) {
      this.error = "No todos los campos están llenos";
      return;
    }
    var date: string = (new Date()).toUTCString();
    var photo_data: UserPhoto = { filepath:"", webviewPath:"" }
    if (this.photo != null){
      photo_data = await this.photoService.savePicture(this.photo);
    }
    this.incident = { id:0, title:this.title, description:this.description, date:date, photo:photo_data };
    this.data.addIncident(this.incident);
    this.router.navigate(['/']);
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }
  
  async addPhotoToGallery() {
    this.photo = await this.photoService.getnewPhoto();
  }

  startRecording() {
    this.audioService.startRecording();
    this.recording_state = 1;
  }

  stopRecording() {
    this.audioService.stopRecording();
    this.recording_state = 2;
  }

  playRecording() {
    this.audioService.playRecording();
  }
}
