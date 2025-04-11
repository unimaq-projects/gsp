import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDateComponent } from './part-date.component';

describe('PartDateComponent', () => {
  let component: PartDateComponent;
  let fixture: ComponentFixture<PartDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
