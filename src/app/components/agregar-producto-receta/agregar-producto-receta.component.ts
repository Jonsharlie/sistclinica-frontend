import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { DataService } from '../../services/data.service'
import { ItemReceta } from '../../interfaces/itemReceta';

@Component({
  selector: 'app-agregar-producto-receta',
  templateUrl: './agregar-producto-receta.component.html',
  styleUrl: './agregar-producto-receta.component.css'
})
export class AgregarProductoRecetaComponent {
  form: FormGroup;
  loading: boolean = false
  id: number | undefined
  producto: Producto | undefined
  isDisabled: boolean = false

  constructor(
    public dialogRef: MatDialogRef<AgregarProductoRecetaComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _productoService: ProductoService,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      stock: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern('/^([0-9])*$/')]],
      indicaciones: ['', Validators.required]
    })
    this.id = data.id
  }

  ngOnInit(): void {
    this.getProducto(this.id)
  }
  
  getProducto(id: number | undefined) {
    this._productoService.getProducto(id!).subscribe(data => {
      this.isDisabled = true
      this.form.setValue({
        nombre: data.nombre,
        stock: data.stock,
        cantidad: '',
        indicaciones: ''
      })
      console.log('getProducto in productoToRecceta', data)
      console.log('isDisabled', this.isDisabled)
    })
  }

  addProductoReceta() {
    const itemReceta: ItemReceta = {
      id_producto: this.id!,
      nombre_producto: this.form.value.nombre,
      cantidad_solicitada: this.form.value.cantidad,
      indicaciones: this.form.value.indicaciones
    } 
    this.loading = true
    // this.dataService.setData(itemReceta)
    this.dialogRef.close(true)
  }

  cancelar() {
    this.dialogRef.close(false)
  }
}
