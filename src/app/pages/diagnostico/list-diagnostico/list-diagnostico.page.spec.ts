import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListDiagnosticoPage } from './list-diagnostico.page';

describe('ListDiagnosticoPage', () => {
  let component: ListDiagnosticoPage;
  let fixture: ComponentFixture<ListDiagnosticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDiagnosticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListDiagnosticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
