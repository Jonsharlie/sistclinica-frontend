import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Compra } from '../../../interfaces/compra';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompraService } from '../../../services/compra.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-compras',
  templateUrl: './list-compras.component.html',
  styleUrl: './list-compras.component.css'
})
export class ListComprasComponent implements AfterViewInit {

  displayedColumns: string[] = ['serie', 'correlativo', 'tipo_pago', 'subtotal', 'igv', 'total', 'fecha_emision', 'acciones'];
  dataSource: MatTableDataSource<Compra>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _compraService: CompraService
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
    this.obtenerCompras()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue)
  }

  obtenerCompras() {
    this.loading = true
    this._compraService.getCompras().subscribe((data:any) => {
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