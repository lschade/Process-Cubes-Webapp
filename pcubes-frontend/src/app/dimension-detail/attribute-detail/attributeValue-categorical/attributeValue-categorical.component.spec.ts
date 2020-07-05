import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeValueCategoricalComponent } from './attributeValue-categorical.component';

describe('AttributeValueCategoricalComponent', () => {
  let component: AttributeValueCategoricalComponent;
  let fixture: ComponentFixture<AttributeValueCategoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeValueCategoricalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValueCategoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
