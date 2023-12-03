import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDesignComponent } from './base-design.component';

describe('BaseDesignComponent', () => {
  let component: BaseDesignComponent;
  let fixture: ComponentFixture<BaseDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseDesignComponent]
    });
    fixture = TestBed.createComponent(BaseDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
