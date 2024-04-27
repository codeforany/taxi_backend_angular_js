import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePriceEditComponent } from './service-price-edit.component';

describe('ServicePriceEditComponent', () => {
  let component: ServicePriceEditComponent;
  let fixture: ComponentFixture<ServicePriceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePriceEditComponent]
    });
    fixture = TestBed.createComponent(ServicePriceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
