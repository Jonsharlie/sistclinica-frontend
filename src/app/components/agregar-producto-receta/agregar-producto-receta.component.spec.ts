import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoRecetaComponent } from './agregar-producto-receta.component';

describe('AgregarProductoRecetaComponent', () => {
  let component: AgregarProductoRecetaComponent;
  let fixture: ComponentFixture<AgregarProductoRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarProductoRecetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarProductoRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
