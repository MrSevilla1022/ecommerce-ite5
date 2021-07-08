import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecredentialsComponent } from './changecredentials.component';

describe('ChangecredentialsComponent', () => {
  let component: ChangecredentialsComponent;
  let fixture: ComponentFixture<ChangecredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangecredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
