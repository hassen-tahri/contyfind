import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInspecteurComponent } from './show-inspecteur.component';

describe('ShowInspecteurComponent', () => {
  let component: ShowInspecteurComponent;
  let fixture: ComponentFixture<ShowInspecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInspecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInspecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
