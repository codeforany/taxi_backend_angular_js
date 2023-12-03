import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneAddComponent } from './ZoneAddComponent';

describe('ZoneAddComponent', () => {
  let component: ZoneAddComponent;
  let fixture: ComponentFixture<ZoneAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneAddComponent]
    });
    fixture = TestBed.createComponent(ZoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
