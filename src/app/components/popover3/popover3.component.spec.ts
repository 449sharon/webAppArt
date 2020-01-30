import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Popover3Component } from './popover3.component';

describe('Popover3Component', () => {
  let component: Popover3Component;
  let fixture: ComponentFixture<Popover3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Popover3Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Popover3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
