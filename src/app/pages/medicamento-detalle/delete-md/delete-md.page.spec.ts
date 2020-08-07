import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteMdPage } from './delete-md.page';

describe('DeleteMdPage', () => {
  let component: DeleteMdPage;
  let fixture: ComponentFixture<DeleteMdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteMdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
