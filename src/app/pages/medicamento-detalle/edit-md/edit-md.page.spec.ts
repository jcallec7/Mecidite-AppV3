import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMdPage } from './edit-md.page';

describe('EditMdPage', () => {
  let component: EditMdPage;
  let fixture: ComponentFixture<EditMdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
