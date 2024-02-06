import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Cargo } from '../../../interfaces/cargo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CargoService } from '../../../services/cargo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarEditarCargoComponent } from '../agregar-editar-cargo/agregar-editar-cargo.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-cargos',
  templateUrl: './list-cargos.component.html',
  styleUrl: './list-cargos.component.css'
})
export class ListCargosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Cargo>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _cargoService: CargoService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.obtenerCargos()
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

  addEditCargo(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarCargoComponent, {
      width: '350px',
      disableClose: true,
      data: {id: id}
    })

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.obtenerCargos()
      }
    })
  }

  obtenerCargos() {
    this.loading = true
    this._cargoService.getCargos().subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  deleteCargo(id: number) {
    this.loading = true
    this._cargoService.deleteCargo(id).subscribe(() => {
      this.obtenerCargos()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("El cargo fue eliminado con éxito", '', {
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
        this.deleteCargo(id)
      }
    })
  }
}
