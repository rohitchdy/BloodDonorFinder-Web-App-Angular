import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeRequestComponent } from './password-change-request.component';

describe('PasswordChangeRequestComponent', () => {
  let component: PasswordChangeRequestComponent;
  let fixture: ComponentFixture<PasswordChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
