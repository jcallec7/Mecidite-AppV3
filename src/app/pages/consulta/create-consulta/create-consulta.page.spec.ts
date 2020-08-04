import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateConsultaPage } from './create-consulta.page';

describe('CreateConsultaPage', () => {
  let component: CreateConsultaPage;
  let fixture: ComponentFixture<CreateConsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConsultaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
