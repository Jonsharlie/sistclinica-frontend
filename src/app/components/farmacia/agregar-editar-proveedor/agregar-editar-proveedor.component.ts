import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../../interfaces/area';
import { ProveedorService } from '../../../services/proveedor.service';
import { AreaService } from '../../../services/area.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-editar-proveedor',
  templateUrl: './agregar-editar-proveedor.component.html',
  styleUrl: './agregar-editar-proveedor.component.css'
})
export class AgregarEditarProveedorComponent {
  form: FormGroup;
  loading: boolean = false
  operacion: string = 'Agregar'
  id: number | undefined;
  areas: Area[] = []

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarProveedorComponent>,
    private fb: FormBuilder,
    private _proveedorService: ProveedorService,
    private _areaService: AreaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', Validators.maxLength(50)],
      telefono: ['', Validators.maxLength(12)],
      representante: ['', Validators.maxLength(100)],
      estado: [true]
    })
    this.id = data.id
  }

  ngOnInit(): void {
    this.esEditar(this.id)
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar '
      this.getProveedor(id)
    }
  }

  getProveedor(id: number) {
    this._proveedorService.getProveedor(id).subscribe((data:any) => {
      console.log('getProveedor data', data)
      this.form.setValue({
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono,
        representante: data.representante,
        estado: data.estado
      })
    })
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  addEditProveedor() {
    if (this.form.invalid) {
      return;
    }

    const proveedor = {
      id_area: 2,
      nombre: this.form.value.nombre,
      direccion: this.form.value.direccion,
      telefono: this.form.value.telefono,
      representante: this.form.value.representante,
      estado: this.form.value.estado,
    }

    this.loading = false

    if (this.id == undefined) {
      this._proveedorService.addProveedor(proveedor).subscribe(() => {
        this.mensajeExito('agregado')
      })
    } else {
      this._proveedorService.updateProveedor(this.id, proveedor).subscribe(() => {
        this.mensajeExito('actualizado')
      })
    }

    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El proveedor fue ${operacion} con éxito`, '', {
      duration: 2000
    })
  }
}
