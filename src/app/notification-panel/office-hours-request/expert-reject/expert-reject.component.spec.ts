import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertRejectComponent } from './expert-reject.component';

describe('ExpertRejectComponent', () => {
  let component: ExpertRejectComponent;
  let fixture: ComponentFixture<ExpertRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
