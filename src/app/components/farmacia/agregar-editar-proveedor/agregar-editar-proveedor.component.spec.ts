import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarProveedorComponent } from './agregar-editar-proveedor.component';

describe('AgregarEditarProveedorComponent', () => {
  let component: AgregarEditarProveedorComponent;
  let fixture: ComponentFixture<AgregarEditarProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarProveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
