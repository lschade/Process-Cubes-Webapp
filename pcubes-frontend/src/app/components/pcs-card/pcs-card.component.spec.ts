import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PcsCardComponent } from './pcs-card.component';

describe('PcsCardComponent', () => {
  let component: PcsCardComponent;
  let fixture: ComponentFixture<PcsCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PcsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
