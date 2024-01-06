import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PcsFormComponent } from './pcs-form.component';

describe('PcsFormComponent', () => {
  let component: PcsFormComponent;
  let fixture: ComponentFixture<PcsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PcsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
