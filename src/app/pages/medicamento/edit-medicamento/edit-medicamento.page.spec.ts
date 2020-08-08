import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMedicamentoPage } from './edit-medicamento.page';

describe('EditMedicamentoPage', () => {
  let component: EditMedicamentoPage;
  let fixture: ComponentFixture<EditMedicamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
