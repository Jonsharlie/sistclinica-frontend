import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PrincipioActivo } from '../../../interfaces/principioActivo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PrincipioActivoService } from '../../../services/principio-activo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPrincipioactivoComponent } from '../agregar-editar-principioactivo/agregar-editar-principioactivo.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-principioactivos',
  templateUrl: './list-principioactivos.component.html',
  styleUrl: './list-principioactivos.component.css'
})
export class ListPrincipioactivosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'estado', 'acciones'];
  dataSource: MatTableDataSource<PrincipioActivo>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _principioActivoService: PrincipioActivoService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerPrincipios()
  }

  ngAfterViewInit(): void {
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

  obtenerPrincipios() {
    this.loading = true
    this._principioActivoService.getPrincipios().subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  addEditPrincipio(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarPrincipioactivoComponent, {
      width: '350px',
      disableClose: true,
      data: {id: id}
    })

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.obtenerPrincipios()
      }
    })
  }

  deletePrincipio(id: number) {
    this.loading = true
    this._principioActivoService.deletePrincipio(id).subscribe(() => {
      this.obtenerPrincipios()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("El principio activo fue eliminado con éxito", '', {
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
        this.deletePrincipio(id)
      }
    })
  }
}