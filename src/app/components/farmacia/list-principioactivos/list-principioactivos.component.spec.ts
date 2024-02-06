import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrincipioactivosComponent } from './list-principioactivos.component';

describe('ListPrincipioactivosComponent', () => {
  let component: ListPrincipioactivosComponent;
  let fixture: ComponentFixture<ListPrincipioactivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPrincipioactivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPrincipioactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
