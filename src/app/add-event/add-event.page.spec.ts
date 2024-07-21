import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AddEventPageRoutingModule } from './add-event-routing.module';
import { AddEventPage } from './add-event.page';

describe('AddEventPage', () => {
  let component: AddEventPage;
  let fixture: ComponentFixture<AddEventPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AddEventPage],
      imports: [IonicModule.forRoot(), AddEventPageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
