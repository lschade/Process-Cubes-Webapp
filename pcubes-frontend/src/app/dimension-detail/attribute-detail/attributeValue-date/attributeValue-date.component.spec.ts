import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeValueDateComponent } from './attributeValue-date.component';

describe('AttributeValueDateComponent', () => {
  let component: AttributeValueDateComponent;
  let fixture: ComponentFixture<AttributeValueDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeValueDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
