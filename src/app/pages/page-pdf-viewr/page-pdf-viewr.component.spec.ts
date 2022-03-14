import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePdfViewrComponent } from './page-pdf-viewr.component';

describe('PagePdfViewrComponent', () => {
  let component: PagePdfViewrComponent;
  let fixture: ComponentFixture<PagePdfViewrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePdfViewrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePdfViewrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
