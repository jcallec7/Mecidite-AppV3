import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListMdPage } from './list-md.page';

describe('ListMdPage', () => {
  let component: ListMdPage;
  let fixture: ComponentFixture<ListMdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListMdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
