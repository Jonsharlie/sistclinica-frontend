import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Unidad } from '../../../interfaces/unidad'
import { MatTableDataSource } from '@angular/material/table';
import { UnidadService } from '../../../services/unidad.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarEditarUnidadComponent } from '../agregar-editar-unidad/agregar-editar-unidad.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-unidades',
  templateUrl: './list-unidades.component.html',
  styleUrl: './list-unidades.component.css'
})
export class ListUnidadesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'abreviatura', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Unidad>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _unidadService: UnidadService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.obtenerUnidades()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
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

  addEditUnidad(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarUnidadComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.obtenerUnidades()
      }
    })
  }

  obtenerUnidades() {
    this.loading = true
    this._unidadService.getUnidades().subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  deleteUnidad(id: number) {
    this.loading = true
    this._unidadService.deleteUnidad(id).subscribe(() => {
      this.obtenerUnidades()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("La unidad fue eliminada con éxito", '', {
      duration: 2000
    })
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
        this.deleteUnidad(id)
      }
    })
  }
}
