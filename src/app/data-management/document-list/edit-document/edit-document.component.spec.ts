import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentComponent } from './edit-document.component';

describe('EditDocumentComponent', () => {
  let component: EditDocumentComponent;
  let fixture: ComponentFixture<EditDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDocumentComponent]
    });
    fixture = TestBed.createComponent(EditDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
