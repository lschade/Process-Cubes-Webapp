import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeValueDateFormComponent } from './attributeValue-date-form.component';

describe('AttributeValueDateFormComponent', () => {
  let component: AttributeValueDateFormComponent;
  let fixture: ComponentFixture<AttributeValueDateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeValueDateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValueDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
