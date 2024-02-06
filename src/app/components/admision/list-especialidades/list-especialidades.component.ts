import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Especialidad } from '../../../interfaces/especialidad';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarEspecialidadComponent } from '../agregar-editar-especialidad/agregar-editar-especialidad.component';
import { EspecialidadService } from '../../../services/especialidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-especialidades',
  templateUrl: './list-especialidades.component.html',
  styleUrl: './list-especialidades.component.css'
})
export class ListEspecialidadesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'abreviatura', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _especialidadService: EspecialidadService,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerEspecialidades()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Ítems por página";
    this.dataSource.paginator._intl.nextPageLabel = 'Página Siguiente';
    this.dataSource.paginator._intl.previousPageLabel = 'Página Anterior';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditEspecialidad(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarEspecialidadComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.obtenerEspecialidades()
      }
    });
  }

  obtenerEspecialidades() {
    this.loading = true
    this._especialidadService.getEspecialidades().subscribe((data: any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteEspecialidad(id: number) {
    this.loading = true
    this._especialidadService.deleteEspecialidad(id).subscribe(() => {
      this.obtenerEspecialidades()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("La especialidad fue eliminada con éxito", '', {
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
    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.deleteEspecialidad(id)
      }
    })
  }
}
