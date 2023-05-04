import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServizioInformaticoComponent } from './servizio-informatico.component';

describe('ServizioInformaticoComponent', () => {
  let component: ServizioInformaticoComponent;
  let fixture: ComponentFixture<ServizioInformaticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServizioInformaticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServizioInformaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
