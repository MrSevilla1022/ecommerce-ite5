import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderstatComponent } from './orderstat.component';

describe('OrderstatComponent', () => {
  let component: OrderstatComponent;
  let fixture: ComponentFixture<OrderstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderstatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
