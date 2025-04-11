import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairDateComponent } from './repair-date.component';

describe('RepairDateComponent', () => {
  let component: RepairDateComponent;
  let fixture: ComponentFixture<RepairDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
