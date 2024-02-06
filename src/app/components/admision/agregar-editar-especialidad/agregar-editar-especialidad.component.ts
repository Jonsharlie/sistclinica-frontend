import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EspecialidadService } from '../../../services/especialidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-especialidad',
  templateUrl: './agregar-editar-especialidad.component.html',
  styleUrl: './agregar-editar-especialidad.component.css'
})
export class AgregarEditarEspecialidadComponent {
  form: FormGroup;
  loading: boolean = false
  operacion: string = 'Agregar '
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarEspecialidadComponent>,
    private fb: FormBuilder,
    private _especialidadService: EspecialidadService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      abreviatura: ['', Validators.maxLength(3)],
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
      this.getEspecialidad(id)
    }
  }

  getEspecialidad(id: number) {
    this._especialidadService.getEspecialidad(id).subscribe((data:any) => {
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

  addEditEspecialidad() {
    if (this.form.invalid) {
      return;
    }

    const especialidad = {
      nombre: this.form.value.nombre,
      abreviatura: this.form.value.abreviatura,
      estado: this.form.value.estado
    }
    
    this.loading = true

    if (this.id == undefined) {
      this._especialidadService.addEspecialidad(especialidad).subscribe(() => {
        this.mensajeExito("agregada")
      })
    } else {
      this._especialidadService.updateEspecialidad(this.id, especialidad).subscribe((data:any) => {
        this.mensajeExito("actualizada")
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La especialidad fue ${operacion} con éxito`, '', {
      duration: 2000
    });
  }
}
