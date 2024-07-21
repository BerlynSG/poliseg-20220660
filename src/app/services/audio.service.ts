import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Media } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private mediaRecorder: any;
  private audioFile: any;

  constructor() {}

  async startRecording() {
    this.mediaRecorder = await Media['create']({
      path: 'recording.wav',
      duration: 60 // duración máxima en segundos
    });

    this.mediaRecorder.startRecord();
  }

  async stopRecording() {
    this.audioFile = await this.mediaRecorder.stopRecord();
  }

  async playRecording() {
    const audio = new Audio(this.audioFile.path);
    audio.play();
  }
}