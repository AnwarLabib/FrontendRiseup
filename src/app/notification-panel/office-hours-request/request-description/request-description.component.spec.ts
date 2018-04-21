import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDescriptionComponent } from './request-description.component';

describe('RequestDescriptionComponent', () => {
  let component: RequestDescriptionComponent;
  let fixture: ComponentFixture<RequestDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
