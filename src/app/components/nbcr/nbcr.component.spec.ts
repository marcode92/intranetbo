import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbcrComponent } from './nbcr.component';

describe('NbcrComponent', () => {
  let component: NbcrComponent;
  let fixture: ComponentFixture<NbcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
