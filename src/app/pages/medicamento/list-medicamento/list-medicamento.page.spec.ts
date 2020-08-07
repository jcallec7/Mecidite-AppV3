import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListMedicamentoPage } from './list-medicamento.page';

describe('ListMedicamentoPage', () => {
  let component: ListMedicamentoPage;
  let fixture: ComponentFixture<ListMedicamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMedicamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
