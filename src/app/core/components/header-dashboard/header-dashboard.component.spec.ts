import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashboardComponent } from './header-dashboard.component';

describe('HeaderDashboardComponent', () => {
  let component: HeaderDashboardComponent;
  let fixture: ComponentFixture<HeaderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
