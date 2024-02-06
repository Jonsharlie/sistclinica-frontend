import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Venta } from '../../../interfaces/venta';
import { MatTableDataSource } from '@angular/material/table';
import { VentaService } from '../../../services/venta.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrl: './list-ventas.component.css'
})
export class ListVentasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nro_documento', 'nombre_tipodocumento', 'nombre_cliente', 'forma_pago', 'subtotal', 'igv', 'total', 'fecha_registro'];
  dataSource: MatTableDataSource<Venta>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _ventaService: VentaService
  ) {
    this.dataSource = new MatTableDataSource()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Ítems por página"
    this.dataSource.paginator._intl.nextPageLabel = 'Página Siguiente'
    this.dataSource.paginator._intl.previousPageLabel = 'Página Anterior'
  }

  ngOnInit(): void {
    this.obtenerVentas()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue)
  }

  obtenerVentas() {
    this.loading = true
    this._ventaService.getVentas().subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`])
  }
}
