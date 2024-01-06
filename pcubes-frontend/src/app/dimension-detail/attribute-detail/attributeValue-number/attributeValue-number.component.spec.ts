import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttributeValueNumberComponent } from './attributeValue-number.component';

describe('AttributeValueNumberComponent', () => {
  let component: AttributeValueNumberComponent;
  let fixture: ComponentFixture<AttributeValueNumberComponent>;

  beforeEach(waitForAsync(() => {
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
