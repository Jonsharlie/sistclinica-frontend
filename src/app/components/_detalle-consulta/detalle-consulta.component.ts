import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from '../../services/consulta.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormatoConsultaService } from '../../services/formato-consulta.service';
import { MatDialog } from '@angular/material/dialog';
import { Consulta } from '../../interfaces/consulta';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router'

@Component({
  selector: 'app-detalle-consulta',
  templateUrl: './detalle-consulta.component.html',
  styleUrl: './detalle-consulta.component.css'
})
export class DetalleConsultaComponent {
  form: FormGroup
  sub: any
  id: number | undefined;
  consulta!: Consulta
  id_consultaformato: number | undefined
  isFinalizado: boolean = false
  nameButton: string = "Guardar"
  historial: Consulta[] = []
  nro_historia: string = ""

  constructor(
    private route: ActivatedRoute,
    private _consultaService: ConsultaService,
    private _formatoConsultaService: FormatoConsultaService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.fb.group({
      enfermedad_actual: [{value: ''}],
      hta: [true],
      dm: [true],
      alergias_medicamentos: [{value: ''}],
      operaciones_anteriores: [{value: ''}],
      examen_fisico: [{value: ''}],
      diagnosticos: [{value: ''}],
      receta: [{value: ''}],
      examenes: [{value: ''}]
    })
    this.setId()
  }

  ngOnInit(): void {
    this.loadDataConsulta()
  }

  getFormatoConsulta() {
    this._formatoConsultaService.getFormatoConsulta(this.consulta.id_consultaformato!).subscribe(data => {
      let detalleJson = JSON.parse(data.detalle.toString())
      console.log('detalleJson', detalleJson)
      this.form.setValue({
        enfermedad_actual: (detalleJson.enfermedad_actual !== undefined) ? detalleJson.enfermedad_actual : '',
        hta: detalleJson.antecedentes.hta,
        dm: detalleJson.antecedentes.dm,
        alergias_medicamentos: (detalleJson.antecedentes.alergias_medicamentos !== undefined) ? detalleJson.antecedentes.alergias_medicamentos : '',
        operaciones_anteriores: (detalleJson.operaciones_anteriores !== undefined) ? detalleJson.operaciones_anteriores : '',
        examen_fisico: (detalleJson.examen_fisico !== undefined) ? detalleJson.examen_fisico : '',
        diagnosticos: (detalleJson.diagnosticos !== undefined) ? detalleJson.diagnosticos : '',
        receta: (detalleJson.receta !== undefined) ? detalleJson.receta : '',
        examenes: (detalleJson.examenes !== undefined) ? detalleJson.examenes : ''
      })
      
      if (this.consulta.estado_consulta == 'FINALIZADO') {
        this.form.controls['enfermedad_actual'].disable()
        this.form.controls['alergias_medicamentos'].disable()
        this.form.controls['operaciones_anteriores'].disable()
        this.form.controls['examen_fisico'].disable()
        this.form.controls['diagnosticos'].disable()
        this.form.controls['receta'].disable()
        this.form.controls['examenes'].disable()
        this.isFinalizado = true
      }
    })
  }

  setId() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']
      console.log('id detalle consulta', this.id)
    })
  }

  loadDataConsulta() {
    console.log('loadDataConsulta')
    this._consultaService.getConsulta(this.id!).subscribe(data => {
      console.log('data consulta', data)
      console.log('id_consultaformato en loadDataConsulta', data.id_consultaformato)
      this.consulta = data
      this.nro_historia = data.nro_historia
      console.log('this.nro_historia 2', this.nro_historia)
      if (data.id_consultaformato !== null) {
        console.log('aaa')
        this.getFormatoConsulta()
        this.nameButton = "Actualizar"
      } else {
        console.log('bbb')
        this.form.setValue({
          enfermedad_actual: '',
          hta: false,
          dm: false,
          alergias_medicamentos: '',
          operaciones_anteriores: '',
          examen_fisico: '',
          diagnosticos: '',
          receta: '',
          examenes: ''
        })
        this.nameButton = "Guardar"
      }
      this.getHistorial()
    })
  }

  getHistorial() {
    console.log('getHistorial')
    console.log('this.nro_historia', this.nro_historia)
    this._consultaService.getHistorial(this.nro_historia).subscribe(data => {
      this.historial = data
      console.log('historial', this.historial)
      console.log('historial length', data.length)
      console.log(typeof this.historial)
    })
  }

  addEditFormatoConsulta() {
    const formatoAntecedentes = {
      hta: this.form.value.hta,
      dm: this.form.value.dm,
      alergias_medicamentos: this.form.value.alergias_medicamentos
    }

    const formato = {
      enfermedad_actual: this.form.value.enfermedad_actual,
      antecedentes: formatoAntecedentes,
      operaciones_anteriores: this.form.value.operaciones_anteriores,
      examen_fisico: this.form.value.examen_fisico,
      diagnosticos: this.form.value.diagnosticos,
      receta: this.form.value.receta,
      examenes: this.form.value.examenes
    }

    const formatoConsulta = {
      id_consulta: this.id,
      detalle: formato
    }

    console.log('formatoConsulta', formatoConsulta)

    if (this.consulta.id_consultaformato == null) {
      console.log('insert formato consulta')
      this._formatoConsultaService.addFormatoConsulta(formatoConsulta).subscribe(data => {
        this.mensajeExito('El formato de consulta fue agregado con éxito')
      })
    } else {
      console.log('update formato consulta')
      this._formatoConsultaService.updateFormatoConsulta(this.consulta.id_consultaformato, formatoConsulta).subscribe(data => {
        this.mensajeExito('El formato de consulta fue actualizado con éxito')
      })
    }
  }

  mensajeExito(msg: string) {
    this._snackBar.open(`${msg}`, '', {
      duration: 2000
    })
  }

  confirmDialog(statusFields: string): void {
    let message = '¿Seguro de aperturar la consulta?'
    let enabledFields = false
    if (statusFields == 'deactivate') {
      message = '¿Seguro de finalizar la consulta?'
      enabledFields = true
    }
    
    const dialogData = new ConfirmDialogModel("Confirmar acción", message)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      disableClose: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (enabledFields) {
          this.finalizar()
        } else {
          this.aperturar()
        }
      }
    })
  }

  finalizar() {
    const updateEstado = {
      "estado_consulta": "FINALIZADO"
    }
    this._consultaService.updateEstadoConsulta(this.id!, updateEstado).subscribe(data => {
      this.mensajeExito('Consulta finalizada con éxito')
      this.isFinalizado = true
      this.form.controls['enfermedad_actual'].disable()
      this.form.controls['alergias_medicamentos'].disable()
      this.form.controls['operaciones_anteriores'].disable()
      this.form.controls['examen_fisico'].disable()
      this.form.controls['diagnosticos'].disable()
      this.form.controls['receta'].disable()
      this.form.controls['examenes'].disable()
    })
  }

  aperturar() {
    this.isFinalizado = false
    this.form.controls['enfermedad_actual'].enable()
    this.form.controls['alergias_medicamentos'].enable()
    this.form.controls['operaciones_anteriores'].enable()
    this.form.controls['examen_fisico'].enable()
    this.form.controls['diagnosticos'].enable()
    this.form.controls['receta'].enable()
    this.form.controls['examenes'].enable()
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`])
  }
}
