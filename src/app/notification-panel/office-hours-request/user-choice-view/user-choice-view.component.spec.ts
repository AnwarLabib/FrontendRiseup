import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChoiceViewComponent } from './user-choice-view.component';

describe('UserChoiceViewComponent', () => {
  let component: UserChoiceViewComponent;
  let fixture: ComponentFixture<UserChoiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChoiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
