import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarAreaComponent } from './agregar-editar-area.component';

describe('AgregarEditarAreaComponent', () => {
  let component: AgregarEditarAreaComponent;
  let fixture: ComponentFixture<AgregarEditarAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
