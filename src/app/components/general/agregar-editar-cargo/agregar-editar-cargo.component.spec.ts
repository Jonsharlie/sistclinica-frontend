import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarCargoComponent } from './agregar-editar-cargo.component';

describe('AgregarEditarRolComponent', () => {
  let component: AgregarEditarCargoComponent;
  let fixture: ComponentFixture<AgregarEditarCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarCargoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
