import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadService } from '../../../services/unidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-editar-unidad',
  templateUrl: './agregar-editar-unidad.component.html',
  styleUrl: './agregar-editar-unidad.component.css'
})
export class AgregarEditarUnidadComponent {
  form: FormGroup;
  loading: boolean = false
  operacion: string = 'Agregar'
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarUnidadComponent>,
    private fb: FormBuilder,
    private _unidadService: UnidadService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      abreviatura: ['', [Validators.required,Validators.maxLength(6)]],
      estado: [true]
    })
    this.id = data.id
  }

  ngOnInit(): void {
    this.esEditar(this.id)
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar'
      this.getUnidad(id)
    }
  }

  getUnidad(id: number) {
    this._unidadService.getUnidad(id).subscribe((data:any) => {
      this.form.setValue({
        nombre: data.nombre,
        abreviatura: data.abreviatura,
        estado: data.estado
      })
    })
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  addEditUnidad() {
    if (this.form.invalid) {
      return;
    }

    const unidad = {
      nombre: this.form.value.nombre,
      abreviatura: this.form.value.abreviatura,
      estado: this.form.value.estado
    }

    this.loading = true

    if (this.id == undefined) {
      this._unidadService.addUnidad(unidad).subscribe(() => {
        this.mensajeExito("agregada")
      })
    } else {
      this._unidadService.updateUnidad(this.id, unidad).subscribe((data:any) => {
        this.mensajeExito("actualizada")
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La unidad fue ${operacion} con éxito`, '', {
      duration: 2000
    });
  }
}
