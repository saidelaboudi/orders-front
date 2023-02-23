import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasscodeComponent } from './passcode.component';

describe('PasscodeComponent', () => {
  let component: PasscodeComponent;
  let fixture: ComponentFixture<PasscodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasscodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
