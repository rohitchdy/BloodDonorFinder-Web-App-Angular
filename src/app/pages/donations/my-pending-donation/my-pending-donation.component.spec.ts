import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPendingDonationComponent } from './my-pending-donation.component';

describe('MyPendingDonationComponent', () => {
  let component: MyPendingDonationComponent;
  let fixture: ComponentFixture<MyPendingDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPendingDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPendingDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
