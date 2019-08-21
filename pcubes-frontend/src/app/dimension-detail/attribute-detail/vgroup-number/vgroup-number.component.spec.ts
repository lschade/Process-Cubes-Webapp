import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VgroupNumberComponent } from './vgroup-number.component';

describe('VgroupNumberComponent', () => {
  let component: VgroupNumberComponent;
  let fixture: ComponentFixture<VgroupNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VgroupNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgroupNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
