import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VgroupNumberFormComponent } from './vgroup-number-form.component';

describe('VgroupNumberFormComponent', () => {
  let component: VgroupNumberFormComponent;
  let fixture: ComponentFixture<VgroupNumberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VgroupNumberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgroupNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
