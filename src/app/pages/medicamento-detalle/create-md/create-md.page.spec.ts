import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMdPage } from './create-md.page';

describe('CreateMdPage', () => {
  let component: CreateMdPage;
  let fixture: ComponentFixture<CreateMdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
