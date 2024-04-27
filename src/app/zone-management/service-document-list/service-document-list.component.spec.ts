import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDocumentListComponent } from './service-document-list.component';

describe('ServiceDocumentListComponent', () => {
  let component: ServiceDocumentListComponent;
  let fixture: ComponentFixture<ServiceDocumentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceDocumentListComponent]
    });
    fixture = TestBed.createComponent(ServiceDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
