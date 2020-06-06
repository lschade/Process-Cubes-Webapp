import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionElementComponent } from './dimension-element.component';

describe('DimensionElementComponent', () => {
  let component: DimensionElementComponent;
  let fixture: ComponentFixture<DimensionElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
