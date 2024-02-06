import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Trabajador } from '../../../interfaces/trabajador';
import { MatTableDataSource } from '@angular/material/table';
import { TrabajadorService } from '../../../services/trabajador.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarEditarTrabajadorComponent } from '../agregar-editar-trabajador/agregar-editar-trabajador.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-trabajadores',
  templateUrl: './list-trabajadores.component.html',
  styleUrl: './list-trabajadores.component.css'
})
export class ListTrabajadoresComponent implements AfterViewInit {
  displayedColumns: string[] = ['apellido_paterno', 'apellido_materno', 'nombres', 'abreviatura_tipodocumento', 'nro_documento', 'nombre_cargo', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Trabajador>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _trabajadorService: TrabajadorService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerTrabajadores()
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

  obtenerTrabajadores() {
    this.loading = true
    this._trabajadorService.getTrabajadores().subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  addEditTrabajador(id?: number) {
    console.log('id', id)
    const dialogRef = this.dialog.open(AgregarEditarTrabajadorComponent, {
      width: '650px',
      disableClose: true,
      data: {id: id}
    })

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.obtenerTrabajadores()
      }
    })
  }

  deleteTrabajador(id: number) {
    this.loading = true
    this._trabajadorService.deleteTrabajador(id).subscribe(() => {
      this.obtenerTrabajadores()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("El trabajador fue eliminado con éxito", '', {
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
    dialogRef .afterClosed().subscribe((dialogResult:any) => {
      if (dialogResult) {
        this.deleteTrabajador(id)
      }
    })
  }
}
