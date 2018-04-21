import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertSuggestionViewComponent } from './expert-suggestion-view.component';

describe('ExpertSuggestionViewComponent', () => {
  let component: ExpertSuggestionViewComponent;
  let fixture: ComponentFixture<ExpertSuggestionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertSuggestionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertSuggestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
