import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarTrabajadorComponent } from './agregar-editar-trabajador.component';

describe('AgregarEditarTrabajadorComponent', () => {
  let component: AgregarEditarTrabajadorComponent;
  let fixture: ComponentFixture<AgregarEditarTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarTrabajadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
