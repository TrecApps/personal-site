import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrooperMatchComponent } from './trooper-match.component';

describe('TrooperMatchComponent', () => {
  let component: TrooperMatchComponent;
  let fixture: ComponentFixture<TrooperMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrooperMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrooperMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
