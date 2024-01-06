import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttributeValueCategoricalFormComponent } from './attributeValue-categorical-form.component';

describe('AttributeValueCategoricalFormComponent', () => {
  let component: AttributeValueCategoricalFormComponent;
  let fixture: ComponentFixture<AttributeValueCategoricalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeValueCategoricalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValueCategoricalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
