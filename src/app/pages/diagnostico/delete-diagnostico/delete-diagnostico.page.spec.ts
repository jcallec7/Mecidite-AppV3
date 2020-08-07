import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteDiagnosticoPage } from './delete-diagnostico.page';

describe('DeleteDiagnosticoPage', () => {
  let component: DeleteDiagnosticoPage;
  let fixture: ComponentFixture<DeleteDiagnosticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDiagnosticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDiagnosticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
