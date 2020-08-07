import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteMedicamentoPage } from './delete-medicamento.page';

describe('DeleteMedicamentoPage', () => {
  let component: DeleteMedicamentoPage;
  let fixture: ComponentFixture<DeleteMedicamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMedicamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
