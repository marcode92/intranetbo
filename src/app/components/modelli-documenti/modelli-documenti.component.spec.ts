import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelliDocumentiComponent } from './modelli-documenti.component';

describe('ModelliDocumentiComponent', () => {
  let component: ModelliDocumentiComponent;
  let fixture: ComponentFixture<ModelliDocumentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelliDocumentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelliDocumentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
