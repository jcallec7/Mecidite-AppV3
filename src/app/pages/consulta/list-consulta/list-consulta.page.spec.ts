import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListConsultaPage } from './list-consulta.page';

describe('ListConsultaPage', () => {
  let component: ListConsultaPage;
  let fixture: ComponentFixture<ListConsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsultaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
