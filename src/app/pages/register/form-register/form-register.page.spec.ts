import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormRegisterPage } from './form-register.page';

describe('FormRegisterPage', () => {
  let component: FormRegisterPage;
  let fixture: ComponentFixture<FormRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
