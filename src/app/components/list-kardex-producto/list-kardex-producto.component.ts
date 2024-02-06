import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kardex } from '../../interfaces/kardex';
import { KardexService } from '../../services/kardex.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-list-kardex-producto',
  templateUrl: './list-kardex-producto.component.html',
  styleUrl: './list-kardex-producto.component.css'
})
export class ListKardexProductoComponent implements AfterViewInit {
  displayedColumns: string[] = ['abrev_tipodocumento', 'numero_serie', 'numero_correlativo', 'entrada', 'salida', 'cantidad'];
  dataSource: MatTableDataSource<Kardex>;
  id_producto: number | undefined;
  sub: any
  producto: Producto | undefined

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _kardexService: KardexService,
    private _productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.dataSource = new MatTableDataSource()
    this.setId()
    this.getProducto()
  }

  ngOnInit(): void {
    this.obtenerMovimientos()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Ítems por página"
    this.dataSource.paginator._intl.nextPageLabel = 'Página Siguiente'
    this.dataSource.paginator._intl.previousPageLabel = 'Página Anterior'
  }

  setId() {
    this.sub = this.route.params.subscribe(params => {
      this.id_producto = +params['id_producto']
      console.log('id_producto kardex producto', this.id_producto)
    })
  }

  obtenerMovimientos() {
    this._kardexService.getMovimientosPorProducto(this.id_producto!).subscribe(data => {
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  getProducto() {
    this._productoService.getProducto(this.id_producto!).subscribe(data => {
      this.producto = data
      console.log('producto en list kardex producto', this.producto.nombre)
    })
  }
}
