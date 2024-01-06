import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttributeDetailComponent } from './attribute-detail.component';

describe('AttributeDetailComponent', () => {
  let component: AttributeDetailComponent;
  let fixture: ComponentFixture<AttributeDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
