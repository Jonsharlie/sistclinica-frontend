import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cargo } from '../../../interfaces/cargo';
import { tipoDocumento } from '../../../interfaces/tipoDocumento';
import { CargoService } from '../../../services/cargo.service';
import { TrabajadorService } from '../../../services/trabajador.service';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-editar-trabajador',
  templateUrl: './agregar-editar-trabajador.component.html',
  styleUrl: './agregar-editar-trabajador.component.css'
})
export class AgregarEditarTrabajadorComponent {
  form: FormGroup;
  loading: boolean = false
  operacion: string = 'Agregar'
  id: number | undefined;
  tipodocs: tipoDocumento[] = [];
  cargos: Cargo[] = [];
  maxDate: Date;
  sexos = [
    {value: "M", viewValue: "Masculino"},
    {value: "F", viewValue: "Femenino"}
  ]

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarTrabajadorComponent>,
    private fb: FormBuilder,
    private _trabajadorService: TrabajadorService,
    private _tipoDocumentoService: TipoDocumentoService,
    private _cargoService: CargoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      id_tipo_documento: ['', Validators.required],
      id_cargo: ['', Validators.required],
      nro_documento: ['', [Validators.required, Validators.maxLength(12)]],
      numero_colegiatura: ['', Validators.maxLength(8)],
      apellido_paterno: ['', [Validators.required, Validators.maxLength(20)]],
      apellido_materno: ['', [Validators.required, Validators.maxLength(20)]],
      nombres: ['', [Validators.required, Validators.maxLength(20)]],
      fecha_nacimiento: [null, Validators.required],
      direccion: ['', Validators.maxLength(50)],
      email: ['', Validators.email],
      numero_telefono: ['', Validators.maxLength(12)],
      sexo: ['', Validators.required],
      estado: [true]
    })
    this.id = data.id
    this.getTipoDocs()
    this.getCargos()
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar '
      this.getTrabajador(id)
    }
  }

  getTrabajador(id: number) {
    console.log('id in getPaciente', id)
    this._trabajadorService.getTrabajador(id).subscribe((data:any) => {
      console.log(data.fecha_nacimiento)
      this.form.setValue({
        id_tipo_documento: data.id_tipo_documento,
        id_cargo: data.id_cargo,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        nombres: data.nombres,
        fecha_nacimiento: new Date(data.fecha_nacimiento),
        nro_documento: data.nro_documento,
        numero_colegiatura: data.numero_colegiatura,
        numero_telefono: data.numero_telefono,
        direccion: data.direccion,
        email: data.email,
        sexo: data.sexo,
        estado: data.estado
      })
    })
  }

  getTipoDocs() {
    this._tipoDocumentoService.getTipoDocumentosPersona().subscribe((data:any) => {
      console.log('tipo docs', data)
      this.tipodocs = data
    })
  }

  getCargos() {
    this._cargoService.getCargos().subscribe((data:any) => {
      console.log('tipo pacs', data)
      this.cargos = data
    })
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  addEditTrabajador() {

    if (this.form.invalid) {
      return;
    }

    const trabajador = {
      id_tipo_documento: this.form.value.id_tipo_documento,
      id_cargo: this.form.value.id_cargo,
      apellido_paterno: this.form.value.apellido_paterno,
      apellido_materno: this.form.value.apellido_materno,
      nombres: this.form.value.nombres,
      fecha_nacimiento: this.form.value.fecha_nacimiento.toISOString().slice(0, 10),
      nro_documento: this.form.value.nro_documento,
      numero_colegiatura: this.form.value.numero_colegiatura,
      numero_telefono: this.form.value.numero_telefono,
      direccion: this.form.value.direccion,
      email: this.form.value.email,
      sexo: this.form.value.sexo,
      estado: this.form.value.estado
    }

    console.log('trabajador', trabajador)

    this.loading = true

    if (this.id == undefined) {
      this._trabajadorService.addTrabajador(trabajador).subscribe(() => {
        this.mensajeExito("agregado")
      })
    } else {
      this._trabajadorService.updateTrabajador(this.id, trabajador).subscribe((data:any) => {
        this.mensajeExito("actualizado")
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El trabajador fue ${operacion} con éxito`, '', {
      duration: 2000
    })
  }
}
