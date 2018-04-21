import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChooseComponent } from './user-choose.component';

describe('UserChooseComponent', () => {
  let component: UserChooseComponent;
  let fixture: ComponentFixture<UserChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
