import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDocumentEditComponent } from './service-document-edit.component';

describe('ServiceDocumentEditComponent', () => {
  let component: ServiceDocumentEditComponent;
  let fixture: ComponentFixture<ServiceDocumentEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceDocumentEditComponent]
    });
    fixture = TestBed.createComponent(ServiceDocumentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
