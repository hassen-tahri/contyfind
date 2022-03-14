import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPageCreatorComponent } from './pdf-page-creator.component';

describe('PdfPageCreatorComponent', () => {
  let component: PdfPageCreatorComponent;
  let fixture: ComponentFixture<PdfPageCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfPageCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPageCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
