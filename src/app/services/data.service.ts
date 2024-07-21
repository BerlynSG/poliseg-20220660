import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { UserPhoto } from './photo.service';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

export interface Incident {
  id: number;
  title: string;
  description: string;
  date: string;
  photo: UserPhoto;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
  
  constructor(private storage: Storage) {
    this.createDB()
  }

  async createDB() {
    this.storage.create()
    if (!(await this.storage.keys()).includes("Incidents")){
      var incident_list: Incident[] = []
      this.storage.set("Incidents", incident_list)
    }
  }

  public async getIncidents(): Promise<Incident[]> {
    return await this.storage.get("Incidents");
  }

  public async getIncidentById(id: number): Promise<Incident> {
    const incident_default: Incident = { id: -1, title:"", description:"", date:"", photo:{ filepath:"", webviewPath:""} }
    var incident_list: Incident[] =  await this.storage.get("Incidents");
    incident_list = incident_list.filter((value: Incident, index: number, array: Incident[]) => value.id == id)
    return incident_list.length > 0 ? incident_list[0] : incident_default
  }

  public async addIncident(incident: Incident) {
    var incident_list: Incident[] =  await this.storage.get("Incidents");
    while (incident_list.filter((value: Incident, index: number, array: Incident[]) => value.id == incident.id).length > 0) {
      incident.id += 1;
    }
    incident_list.push(incident)
    await this.storage.set("Incidents", incident_list)
  }
}
