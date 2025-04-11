import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDateComponent } from './provider-date.component';

describe('ProviderDateComponent', () => {
  let component: ProviderDateComponent;
  let fixture: ComponentFixture<ProviderDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
