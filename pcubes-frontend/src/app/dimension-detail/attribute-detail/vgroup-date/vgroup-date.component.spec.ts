import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VgroupDateComponent } from './vgroup-date.component';

describe('VgroupDateComponent', () => {
  let component: VgroupDateComponent;
  let fixture: ComponentFixture<VgroupDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VgroupDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgroupDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
