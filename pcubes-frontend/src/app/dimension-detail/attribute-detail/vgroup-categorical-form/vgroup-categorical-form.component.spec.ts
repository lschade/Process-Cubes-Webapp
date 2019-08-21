import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VgroupCategoricalFormComponent } from './vgroup-categorical-form.component';

describe('VgroupCategoricalFormComponent', () => {
  let component: VgroupCategoricalFormComponent;
  let fixture: ComponentFixture<VgroupCategoricalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VgroupCategoricalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgroupCategoricalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
