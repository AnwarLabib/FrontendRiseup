import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertSuggestComponent } from './expert-suggest.component';

describe('ExpertSuggestComponent', () => {
  let component: ExpertSuggestComponent;
  let fixture: ComponentFixture<ExpertSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
