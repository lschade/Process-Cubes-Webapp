import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionDetailComponent } from './dimension-detail.component';

describe('DimensionDetailComponent', () => {
  let component: DimensionDetailComponent;
  let fixture: ComponentFixture<DimensionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
