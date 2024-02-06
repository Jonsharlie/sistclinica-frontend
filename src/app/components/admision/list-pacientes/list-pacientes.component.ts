import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Paciente } from '../../../interfaces/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PacienteService } from '../../../services/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPacienteComponent } from '../agregar-editar-paciente/agregar-editar-paciente.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-pacientes',
  templateUrl: './list-pacientes.component.html',
  styleUrl: './list-pacientes.component.css'
})
export class ListPacientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nro_historia', 'nombre_completo', 'abreviatura_tipodocumento', 'estado', 'acciones'];
  
  dataSource: MatTableDataSource<Paciente>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _pacienteService: PacienteService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerPacientes()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Ítems por página"
    this.dataSource.paginator._intl.nextPageLabel = 'Página Siguiente'
    this.dataSource.paginator._intl.previousPageLabel = 'Página Anterior'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerPacientes() {
    this.loading = true
    this._pacienteService.getPacientes().subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  addEditPaciente(nro_historia?: string) {
    const dialogRef = this.dialog.open(AgregarEditarPacienteComponent, {
      width: '650px',
      disableClose: true,
      data: {nro_historia: nro_historia}
    })

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.obtenerPacientes()
      }
    })
  }

  deletePaciente(nro_historia: string) {
    this.loading = true
    this._pacienteService.deletePaciente(nro_historia).subscribe(() => {
      this.obtenerPacientes()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("El paciente fue eliminado con éxito", '', {
      duration: 2000
    });
  }

  confirmDialog(nro_historia: string): void {
    const message = '¿Seguro que quieres realizar esta acción?'
    const dialogData = new ConfirmDialogModel("Confirmar acción", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      disableClose: true,
      data: dialogData
    })
    dialogRef .afterClosed().subscribe((dialogResult:any) => {
      if (dialogResult) {
        this.deletePaciente(nro_historia)
      }
    })
  }
}
