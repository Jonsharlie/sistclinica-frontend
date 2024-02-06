import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from '../../../services/cargo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-cargo',
  templateUrl: './agregar-editar-cargo.component.html',
  styleUrl: './agregar-editar-cargo.component.css'
})
export class AgregarEditarCargoComponent {
  form: FormGroup
  loading: boolean = false
  operacion: string = 'Agregar '
  id: number | undefined

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarCargoComponent>,
    private fb: FormBuilder,
    private _cargoService: CargoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
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
      this.getCargo(id)
    }
  }

  getCargo(id: number) {
    this._cargoService.getCargo(id).subscribe((data:any) => {
      this.form.setValue({
        nombre: data.nombre,
        estado: data.estado
      })
    })
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  addEditCargo() {
    if (this.form.invalid) {
      return;
    }

    const cargo = {
      nombre: this.form.value.nombre,
      estado: this.form.value.estado
    }

    this.loading = true

    if (this.id == undefined) {
      this._cargoService.addCargo(cargo).subscribe(() => {
        this.mensajeExito("agregado")
      })
    } else {
      this._cargoService.updateCargo(this.id, cargo).subscribe((data:any) => {
        this.mensajeExito("actualizado")
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El cargo fue ${operacion} con éxito`, '', {
      duration: 2000
    });
  }
}
