import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneEditComponent } from './zone-edit.component';

describe('ZoneEditComponent', () => {
  let component: ZoneEditComponent;
  let fixture: ComponentFixture<ZoneEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneEditComponent]
    });
    fixture = TestBed.createComponent(ZoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
