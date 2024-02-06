import { Component, Inject } from '@angular/core';
import { Especialidad } from '../../../interfaces/especialidad';
import { Trabajador } from '../../../interfaces/trabajador';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialidadService } from '../../../services/especialidad.service';
import { TrabajadorService } from '../../../services/trabajador.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultaService } from '../../../services/consulta.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-agregar-editar-consulta',
  templateUrl: './agregar-editar-consulta.component.html',
  styleUrl: './agregar-editar-consulta.component.css'
})
export class AgregarEditarConsultaComponent {
  form: FormGroup;
  loading: boolean = false
  operacion: string = 'Agregar'
  id: number | undefined;
  especialidades: Especialidad[] = [];
  doctores: Trabajador[] = [];
  minDate: Date;
  tiposAtencion = [
    {value: "CONSULTA"},
    {value: "CONTROL"},
    {value: "CORTESÍA"}
  ]

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarConsultaComponent>,
    private fb: FormBuilder,
    private _especialidadService: EspecialidadService,
    private _trabajadorService: TrabajadorService,
    private _consultaService: ConsultaService,
    private _pacienteService: PacienteService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.minDate = new Date();
    this.form = this.fb.group({
      id_especialidad: ['', Validators.required],
      id_medico_consulta: ['', Validators.required],
      nro_historia: ['', [Validators.required, Validators.maxLength(10)]],
      nombre_paciente: ['', [Validators.required, Validators.maxLength(70)]],
      fecha_registro: [null, Validators.required],
      valor: ['', Validators.required],
      tipo_atencion: ['', Validators.required],
      estado: [true]
    })
    this.id = data.id
    this.getEspecialidades()
    this.getDoctores()
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar '
      this.getConsulta(id)
    } else {
      // const currentDate = new Date().toDateString()
      const currentDate = this.getCurrentDate()
      console.log('currentDate', currentDate)
      // this.form.get('fecha_registro')?.setValue(currentDate)
      this.form.patchValue({
        fecha_registro: currentDate
      })
    }
  }

  getConsulta(id: number) {
    console.log('id in getConsulta', id)
    this._consultaService.getConsulta(id).subscribe((data: any) => {
      console.log('data consulta', data)
      console.log(data.fecha_registro)
      this.form.setValue({
        id_especialidad: data.id_especialidad,
        id_medico_consulta: data.id_medico_consulta,
        nro_historia: data.nro_historia,
        nombre_paciente: data.nombre_paciente,
        fecha_registro: data.fecha_registro,
        valor: data.valor,
        estado: data.estado,
        tipo_atencion: data.tipo_atencion
      })
    })
  }

  getEspecialidades() {
    this._especialidadService.getEspecialidades().subscribe((data: any) => {
      console.log('especialidades', data)
      this.especialidades = data
    })
  }

  getDoctores() {
    this._trabajadorService.getTrabajadoresPorCargo(2).subscribe((data: any) => {
      console.log('doctores', data)
      this.doctores = data
    })
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  addEditConsulta() {
    if (this.form.invalid) {
      return;
    }

    const detalleConsulta = {
      codigo_tiposervicio: 'AA',
      nombre_tiposervicio: 'ATENCIÓN AMBULATORIA',
      id_especialidad: this.form.value.id_especialidad,
      nombre_servicio: 'UROLOGÍA',
      valor_servicio: this.form.value.valor,
      monto_seguro: 0.00,
      monto_paciente: this.form.value.valor,
      estado: 1
    }

    const consulta = {
      id_tipo_paciente: 1,
      id_medico_consulta: this.form.value.id_medico_consulta,
      nro_historia: this.form.value.nro_historia,
      nombre_paciente: this.form.value.nombre_paciente,
      fecha_registro: this.form.value.fecha_registro.toISOString().slice(0, 10),
      estado_consulta: 'CONFIRMADO',
      tipo_atencion: this.form.value.tipo_atencion,
      estado: this.form.value.estado,
      id_especialidad: this.form.value.id_especialidad,
      nombre_servicio: "",
      nombre_tipopaciente: "PARTICULAR",
      doctor_consulta: "",
      nombre_tiposervicio: "ATENCIÓN AMBULATORIA",
      fecha_nacimiento: new Date('1990-04-21'),
      valor: this.form.value.valor,
      id_consultaformato: undefined,
      codigo_tiposervicio: 'AA',
      id_puntoventa: 1,
      coaseguro_seguro: 0,
      coaseguro_paciente: 100,
      detalle_consulta: detalleConsulta
    }
    console.log('consulta', consulta)

    this.loading = true

    if (this.id == undefined) {
      this._consultaService.addConsulta(consulta).subscribe(() => {
        this.mensajeExito("agregado")
      })
    } else {
      this._consultaService.updateConsulta(this.id, consulta).subscribe((data: any) => {
        this.mensajeExito("actualizado")
      })
    }
    this.loading = false
    this.dialogRef.close(true)
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La consulta fue ${operacion} con éxito`, '', {
      duration: 2000
    })
  }

  searchPatient() {
    const nro_historia = this.form.value.nro_historia
    console.log('nro_historia desde form', nro_historia)
    this._pacienteService.getPaciente(nro_historia).subscribe((data: any) => {
      const nombreCompleto = data.apellido_paterno.trim()+' '+data.apellido_materno.trim()+' '+data.nombres.trim()
      console.log('data paciente', data)
      console.log('nombreCompleto', nombreCompleto)
      this.form.controls['nombre_paciente'].setValue(nombreCompleto)
    })
  }

  getCurrentDate() {
    let today = new Date()
    let date = today.toJSON().slice(0, 10);
    let nDate = date.slice(8, 10) + '/'
        + date.slice(5, 7) + '/'
        + date.slice(0, 4);
    return nDate
  }
}
