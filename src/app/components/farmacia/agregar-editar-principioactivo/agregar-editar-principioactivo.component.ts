import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrincipioActivoService } from '../../../services/principio-activo.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-principioactivo',
  templateUrl: './agregar-editar-principioactivo.component.html',
  styleUrl: './agregar-editar-principioactivo.component.css'
})
export class AgregarEditarPrincipioactivoComponent {
  form: FormGroup
  loading: boolean = false
  operacion: string = 'Agregar '
  id: number | undefined

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarPrincipioactivoComponent>,
    private fb: FormBuilder,
    private _principioActivoService: PrincipioActivoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
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
      this.getPrincipio(id)
    }
  }

  getPrincipio(id: number) {
    this._principioActivoService.getPrincipio(id).subscribe((data:any) => {
      this.form.setValue({
        nombre: data.nombre,
        estado: data.estado
      })
    })
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  addEditPrincipio() {
    if (this.form.invalid) {
      return;
    }

    const principio = {
      nombre: this.form.value.nombre,
      estado: this.form.value.estado
    }

    this.loading = true

    if (this.id == undefined) {
      this._principioActivoService.addPrincipio(principio).subscribe(() => {
        this.mensajeExito("agregado")
      })
    } else {
      this._principioActivoService.updatePrincipio(this.id, principio).subscribe((data:any) => {
        this.mensajeExito("actualizado")
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El principio activo fue ${operacion} con éxito`, '', {
      duration: 2000
    });
  }
}
