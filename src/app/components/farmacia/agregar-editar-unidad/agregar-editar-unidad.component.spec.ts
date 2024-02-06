import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarUnidadComponent } from './agregar-editar-unidad.component';

describe('AgregarEditarUnidadComponent', () => {
  let component: AgregarEditarUnidadComponent;
  let fixture: ComponentFixture<AgregarEditarUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarUnidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
