import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDateComponent } from './evaluation-date.component';

describe('EvaluationDateComponent', () => {
  let component: EvaluationDateComponent;
  let fixture: ComponentFixture<EvaluationDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
