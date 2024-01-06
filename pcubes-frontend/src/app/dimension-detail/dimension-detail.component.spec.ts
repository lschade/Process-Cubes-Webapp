import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DimensionDetailComponent } from './dimension-detail.component';

describe('DimensionDetailComponent', () => {
  let component: DimensionDetailComponent;
  let fixture: ComponentFixture<DimensionDetailComponent>;

  beforeEach(waitForAsync(() => {
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
