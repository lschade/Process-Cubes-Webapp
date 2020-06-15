import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VgroupCategoricalComponent } from './vgroup-categorical.component';

describe('VgroupCategoricalComponent', () => {
  let component: VgroupCategoricalComponent;
  let fixture: ComponentFixture<VgroupCategoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VgroupCategoricalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgroupCategoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
