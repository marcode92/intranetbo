import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectPresenceComponent } from './correct-presence.component';

describe('CorrectPresenceComponent', () => {
  let component: CorrectPresenceComponent;
  let fixture: ComponentFixture<CorrectPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectPresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
