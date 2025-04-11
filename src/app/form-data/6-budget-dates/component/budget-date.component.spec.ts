import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDateComponent } from './budget-date.component';

describe('BudgetDateComponent', () => {
  let component: BudgetDateComponent;
  let fixture: ComponentFixture<BudgetDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
