import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualiComponent } from './manuali.component';

describe('ManualiComponent', () => {
  let component: ManualiComponent;
  let fixture: ComponentFixture<ManualiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
