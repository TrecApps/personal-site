import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHistoryComponent } from './site-history.component';

describe('SiteHistoryComponent', () => {
  let component: SiteHistoryComponent;
  let fixture: ComponentFixture<SiteHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
