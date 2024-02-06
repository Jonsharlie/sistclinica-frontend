import { Component, Inject } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service'
import { TipoDocumentoService } from '../../../services/tipo-documento.service'
import { TipoPacienteService } from '../../../services/tipo-paciente.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tipoDocumento } from '../../../interfaces/tipoDocumento'
import { tipoPaciente } from '../../../interfaces/tipoPaciente'

@Component({
  selector: 'app-agregar-editar-paciente',
  templateUrl: './agregar-editar-paciente.component.html',
  styleUrl: './agregar-editar-paciente.component.css'
})
export class AgregarEditarPacienteComponent {
  form: FormGroup;
  loading: boolean = false
  operacion: string = 'Agregar'
  nro_historia: string | undefined;
  tipodocs: tipoDocumento[] = [];
  tipopaci: tipoPaciente[] = [];
  maxDate: Date;
  sexos = [
    {value: "M", viewValue: "Masculino"},
    {value: "F", viewValue: "Femenino"}
  ]

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarPacienteComponent>,
    private fb: FormBuilder,
    private _pacienteService: PacienteService,
    private _tipoDocumentoService: TipoDocumentoService,
    private _tipoPacienteService: TipoPacienteService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.maxDate = new Date();

    this.form = this.fb.group({
      id_tipo_documento: [2, Validators.required],
      nro_documento: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      apellido_paterno: ['', [Validators.required, Validators.maxLength(20)]],
      apellido_materno: ['', [Validators.required, Validators.maxLength(20)]],
      nombres: ['', [Validators.required, Validators.maxLength(20)]],
      fecha_nacimiento: [null, Validators.required],
      numero_telefono: [''],
      direccion: [''],
      sexo: ['', Validators.required],
      estado: [true]
    })
    this.loadData()
    this.nro_historia = data.nro_historia
  }

  ngOnInit(): void {
    this.esEditar(this.nro_historia);
  }

  esEditar(nro_historia: string | undefined) {
    if (nro_historia !== undefined) {
      this.operacion = 'Editar '
      this.getPaciente(nro_historia)
    }
  }

  getPaciente(nro_historia: string) {
    this._pacienteService.getPaciente(nro_historia).subscribe((data:any) => {
      this.form.setValue({
        id_tipo_documento: data.id_tipo_documento,
        nro_documento: data.nro_documento,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        nombres: data.nombres,
        fecha_nacimiento: new Date(data.fecha_nacimiento),
        numero_telefono: data.numero_telefono,
        direccion: data.direccion,
        sexo: data.sexo,
        estado: data.estado
      })
    })
  }

  getTipoDocs() {
    this._tipoDocumentoService.getTipoDocumentosPersona().subscribe((data:any) => {
      this.tipodocs = data
    })
  }

  getTipoPac() {
    this._tipoPacienteService.getTipoPacientesActivos().subscribe((data:any) => {
      this.tipopaci = data
    })
  }

  loadData() {
    this.getTipoDocs()
    this.getTipoPac()
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  addEditPaciente() {

    if (this.form.invalid) {
      return;
    }

    const paciente = {
      nro_historia: this.form.value.nro_documento,
      id_tipo_documento: this.form.value.id_tipo_documento,
      id_tipo_paciente: 1,
      apellido_paterno: this.form.value.apellido_paterno,
      apellido_materno: this.form.value.apellido_materno,
      nombres: this.form.value.nombres,
      fecha_nacimiento: this.form.value.fecha_nacimiento.toISOString().slice(0, 10),
      nro_documento: this.form.value.nro_documento,
      numero_telefono: this.form.value.numero_telefono,
      direccion: this.form.value.direccion,
      sexo: this.form.value.sexo,
      coaseguro_seguro: 0,
      coaseguro_paciente: 100,
      estado: this.form.value.estado,
      updated_at: (this.nro_historia == undefined) ? new Date() : undefined
    }

    console.log('paciente', paciente)

    this.loading = true

    if (this.nro_historia == undefined) {
      this._pacienteService.addPaciente(paciente).subscribe(() => {
        this.mensajeExito("agregado")
      })
    } else {
      this._pacienteService.updatePaciente(this.nro_historia, paciente).subscribe((data:any) => {
        this.mensajeExito("actualizado")
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El paciente fue ${operacion} con éxito`, '', {
      duration: 2000
    })
  }
}
