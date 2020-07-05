import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeValueNumberComponent } from './attributeValue-number.component';

describe('AttributeValueNumberComponent', () => {
  let component: AttributeValueNumberComponent;
  let fixture: ComponentFixture<AttributeValueNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeValueNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValueNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
