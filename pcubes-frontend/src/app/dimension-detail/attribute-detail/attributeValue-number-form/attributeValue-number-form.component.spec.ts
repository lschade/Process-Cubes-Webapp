import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttributeValueNumberFormComponent } from './attributeValue-number-form.component';

describe('AttributeValueNumberFormComponent', () => {
  let component: AttributeValueNumberFormComponent;
  let fixture: ComponentFixture<AttributeValueNumberFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeValueNumberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValueNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
