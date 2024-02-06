import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Producto } from '../../../interfaces/producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarEditarProductoComponent } from '../agregar-editar-producto/agregar-editar-producto.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css'
})
export class ListProductosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'nombre_unidadentero', 'nombre_unidadfrac', 'precio_costo', 'precio_venta', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Producto>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _productoService: ProductoService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerProductos()
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

  obtenerProductos() {
    this.loading = true
    this._productoService.getProductos().subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  addEditProducto(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarProductoComponent, {
      width: '650px',
      disableClose: true,
      data: {id: id}
    })

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.obtenerProductos()
      }
    })
  }

  deleteProducto(id: number) {
    this.loading = true
    console.log('delete id producto', id)
  }

  mensajeExito() {
    this._snackBar.open("El producto fue eliminado con éxito", '', {
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
        this.deleteProducto(id)
      }
    })
  }
}
