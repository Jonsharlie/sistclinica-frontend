import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unidad } from '../../../interfaces/unidad';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from '../../../services/producto.service';
import { UnidadService } from '../../../services/unidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrl: './agregar-editar-producto.component.css'
})
export class AgregarEditarProductoComponent {
  form: FormGroup;
  loading: boolean = false
  operacion: string = 'Agregar'
  id: number | undefined;
  unidades: Unidad[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarProductoComponent>,
    private fb: FormBuilder,
    private _productoService: ProductoService,
    private _unidadService: UnidadService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      id_unidad: ['', Validators.required],
      id_unidad_frac: ['', Validators.required],
      codigo_gtin: ['', Validators.maxLength(17)],
      // precio_costo: ['', [Validators.required, Validators.pattern('^[0-9]+[.,]{1,1}\[0-9]{2,2}$')]],
      // precio_venta: ['', Validators.pattern('^[0-9]+[.,]{1,1}\[0-9]{2,2}$')],
      // capacidad: ['', [Validators.required, Validators.pattern('^[0-9]+[.,]{1,1}\[0-9]{2,2}$')]],
      // capacidad: ['', [Validators.required, Validators.pattern('/^[0-9]+([.])?([0-9]+)?$/')]],
      capacidad: ['', [Validators.required, Validators.pattern('^[0-9]+([.])?([0-9]+)?$')]],
      // utilidad: ['', [Validators.required, Validators.pattern('^[0-9]+[.,]{1,1}\[0-9]{2,2}$')]],
      // stock: ['', [Validators.required, Validators.pattern('^[0-9]+[.,]{1,1}\[0-9]{2,2}$')]],
      venta: [true],
      insumo: [false],
      maneja_lote: [true],
      igv: [true],
      estado: [true]
    })
    this.id = data.id
    this.getUnidades()
  }

  ngOnInit(): void {
    this.esEditar(this.id)
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar '
      this.getProducto(id)
    }
  }

  getProducto(id: number) {
    this._productoService.getProducto(id).subscribe((data:any) => {
      console.log('data getProducto', data)
      this.form.setValue({
        nombre: data.nombre,
        // id_area: data.id_area,
        id_unidad: data.id_unidad,
        id_unidad_frac: data.id_unidad_frac,
        // codigo_gtin: data.codigo_gtin,
        // precio_costo: parseFloat(data.precio_costo.toFixed(2)),
        // precio_venta: data.precio_venta,
        capacidad: data.capacidad,
        igv: data.igv,
        // utilidad: data.utilidad,
        stock: data.stock,
        venta: data.venta,
        insumo: data.insumo,
        maneja_lote: data.maneja_lote,
        estado: data.estado
      })
    })
  }

  getUnidades() {
    this._unidadService.getUnidades().subscribe((data:any) => {
      this.unidades = data
    })
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  addEditProducto() {
    if (this.form.invalid) {
      return;
    }

    const producto = {
      nombre: this.form.value.nombre,
      id_area: 2,
      id_unidad: this.form.value.id_unidad,
      id_unidad_frac: this.form.value.id_unidad_frac,
      capacidad: this.form.value.capacidad,
      igv: this.form.value.igv,
      // utilidad: this.form.value.utilidad,
      codigo_gtin: this.form.value.codigo_gtin,
      // precio_costo: this.form.value.precio_costo,
      // precio_venta: this.form.value.precio_venta,
      stock: this.form.value.stock,
      venta: this.form.value.venta,
      insumo: this.form.value.insumo,
      maneja_lote: this.form.value.maneja_lote,
      estado: this.form.value.estado
    }

    console.log('addEditProducto form', this.form)
    console.log('addEditProducto producto', producto)

    this.loading = true

    if (this.id == undefined) {
      this._productoService.addProducto(producto).subscribe(() => {
        this.mensajeExito('agregado')
      })
    } else {
      this._productoService.updateProducto(this.id, producto).subscribe(() => {
        this.mensajeExito('actualizado')
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El producto fue ${operacion} con éxito`, '', {
      duration: 2000
    })
  }
}
