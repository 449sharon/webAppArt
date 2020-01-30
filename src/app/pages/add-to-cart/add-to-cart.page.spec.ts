import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddToCartPage } from './add-to-cart.page';

describe('AddToCartPage', () => {
  let component: AddToCartPage;
  let fixture: ComponentFixture<AddToCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddToCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
