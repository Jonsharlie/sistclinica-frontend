import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrl: './buscar-producto.component.css'
})
export class BuscarProductoComponent {
  displayedColumns: string[] = ['nombre', 'nombre_unidadentero', 'nombre_unidadfrac', 'capacidad', 'precio_costo', 'precio_venta', 'stock'];
  dataSource: MatTableDataSource<Producto>;
  constructor(
    private dialogRef: MatDialogRef<BuscarProductoComponent>,
    private _productoService: ProductoService,
    private dataService: DataService
  ){
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.obtenerProductos()
  }

  selectProduct(producto: Producto) {
    console.log('id producto seleccionado', producto)
    this.dataService.setData(producto)
    this.dialogRef.close(false)
  }

  cancelar() {
    this.dialogRef.close(false)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe((data:any) => {
      this.dataSource.data = data
    })
  }
}
