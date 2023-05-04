import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeriServizioInformaticoComponent } from './numeri-servizio-informatico.component';

describe('NumeriServizioInformaticoComponent', () => {
  let component: NumeriServizioInformaticoComponent;
  let fixture: ComponentFixture<NumeriServizioInformaticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeriServizioInformaticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumeriServizioInformaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
