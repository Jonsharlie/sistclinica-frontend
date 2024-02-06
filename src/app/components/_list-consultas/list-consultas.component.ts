import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Consulta } from '../../interfaces/consulta';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaService } from '../../services/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarEditarConsultaComponent } from '../_agregar-editar-consulta/agregar-editar-consulta.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-consultas',
  templateUrl: './list-consultas.component.html',
  styleUrl: './list-consultas.component.css'
})
export class ListConsultasComponent implements AfterViewInit {

  displayedColumns: string[] = ['nro_historia', 'nombre_paciente', 'tipo_atencion', 'estado_consulta', 'fecha_registro', 'fecha_atencion', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _consultaService: ConsultaService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerConsultas()
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

  addEditConsulta(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarConsultaComponent, {
      width: '650px',
      disableClose: true,
      data: {id: id}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerConsultas()
      }
    })
  }

  obtenerConsultas() {
    this.loading = true
    this._consultaService.getConsultas().subscribe(data => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  deleteConsulta(id: number) {
    this.loading = true
    this._consultaService.deleteConsulta(id).subscribe(() => {
      this.obtenerConsultas()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("La consulta fue eliminada con éxito", '', {
      duration: 2000
    });
  }

  confirmDialog(id: number): void {
    const message = '¿Seguro que quieres realizar esta acción?'
    const dialogData = new ConfirmDialogModel("Confirmar acción", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      disableClose: true,
      data: dialogData
    })
    dialogRef .afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteConsulta(id)
      }
    })
  }
}
