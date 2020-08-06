import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypeOfRegisterPage } from './type-of-register.page';

describe('TypeOfRegisterPage', () => {
  let component: TypeOfRegisterPage;
  let fixture: ComponentFixture<TypeOfRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypeOfRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
