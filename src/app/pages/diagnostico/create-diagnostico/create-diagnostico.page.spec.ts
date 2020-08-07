import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateDiagnosticoPage } from './create-diagnostico.page';

describe('CreateDiagnosticoPage', () => {
  let component: CreateDiagnosticoPage;
  let fixture: ComponentFixture<CreateDiagnosticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiagnosticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDiagnosticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
