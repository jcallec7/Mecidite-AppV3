import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditConsultaPage } from './edit-consulta.page';

describe('EditConsultaPage', () => {
  let component: EditConsultaPage;
  let fixture: ComponentFixture<EditConsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConsultaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
