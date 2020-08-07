import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMedicamentoPage } from './create-medicamento.page';

describe('CreateMedicamentoPage', () => {
  let component: CreateMedicamentoPage;
  let fixture: ComponentFixture<CreateMedicamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMedicamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
