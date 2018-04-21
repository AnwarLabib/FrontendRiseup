import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHoursRequestComponent } from './office-hours-request.component';

describe('OfficehoursrequestComponent', () => {
  let component: OfficeHoursRequestComponent;
  let fixture: ComponentFixture<OfficeHoursRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeHoursRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeHoursRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
