import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddToWishListPage } from './add-to-wish-list.page';

describe('AddToWishListPage', () => {
  let component: AddToWishListPage;
  let fixture: ComponentFixture<AddToWishListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToWishListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddToWishListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
