import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService } from '../../../services/area.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-area',
  templateUrl: './agregar-editar-area.component.html',
  styleUrl: './agregar-editar-area.component.css'
})
export class AgregarEditarAreaComponent {
  form: FormGroup;
  loading: boolean = false
  operacion: string = 'Agregar'
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarAreaComponent>,
    private fb: FormBuilder,
    private _areaService: AreaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
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
      this.operacion = 'Editar'
      this.getArea(id)
    }
  }

  getArea(id: number) {
    this._areaService.getArea(id).subscribe((data:any) => {
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

  addEditArea() {
    if (this.form.invalid) {
      return;
    }

    const area = {
      nombre: this.form.value.nombre,
      abreviatura: this.form.value.abreviatura,
      estado: this.form.value.estado
    }
    
    this.loading = true

    if (this.id == undefined) {
      this._areaService.addArea(area).subscribe(() => {
        this.mensajeExito("agregada")
      })
    } else {
      this._areaService.updateArea(this.id, area).subscribe((data:any) => {
        this.mensajeExito("actualizada")
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El área fue ${operacion} con éxito`, '', {
      duration: 2000
    });
  }
}
