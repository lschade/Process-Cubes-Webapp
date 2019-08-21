import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VgroupDateFormComponent } from './vgroup-date-form.component';

describe('VgroupDateFormComponent', () => {
  let component: VgroupDateFormComponent;
  let fixture: ComponentFixture<VgroupDateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VgroupDateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgroupDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
