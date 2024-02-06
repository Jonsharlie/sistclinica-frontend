import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCargosComponent } from './list-cargos.component';

describe('ListCargosComponent', () => {
  let component: ListCargosComponent;
  let fixture: ComponentFixture<ListCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCargosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
