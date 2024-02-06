import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedor } from '../../../interfaces/proveedor';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorService } from '../../../services/proveedor.service';
import { AgregarEditarProveedorComponent } from '../agregar-editar-proveedor/agregar-editar-proveedor.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-proveedores',
  templateUrl: './list-proveedores.component.html',
  styleUrl: './list-proveedores.component.css'
})
export class ListProveedoresComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'direccion', 'representante', 'telefono', 'estado', 'acciones'];

  dataSource: MatTableDataSource<Proveedor>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _proveedorService: ProveedorService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.obtenerProveedores()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Ítems por página"
    this.dataSource.paginator._intl.nextPageLabel = 'Página Siguiente'
    this.dataSource.paginator._intl.previousPageLabel = 'Página Anterior'
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  obtenerProveedores() {
    const isSistema = 0
    this.loading = true
    this._proveedorService.getProveedores(isSistema).subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  addEditProveedor(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarProveedorComponent, {
      width: '650px',
      disableClose: true,
      data: {id: id}
    })

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.obtenerProveedores()
      }
    })
  }

  deleteProveedor(id: number) {
    this.loading = true
    this._proveedorService.deleteProveedor(id).subscribe(() => {
      this.obtenerProveedores()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("El paciente fue eliminado con éxito", '', {
      duration: 2000
    });
  }

  confirmDialog(id: number): void {
    const message = '¿Seguro que quieres realizar esta acción?'
    const dialogData = new ConfirmDialogModel("Confirmar acción", message)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      disableClose: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe((dialogResult:any) => {
      if (dialogResult) {
        this.deleteProveedor(id)
      }
    })
  }
}
