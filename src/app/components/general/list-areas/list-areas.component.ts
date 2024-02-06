import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Area } from '../../../interfaces/area';
import { MatTableDataSource } from '@angular/material/table';
import { AreaService } from '../../../services/area.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AgregarEditarAreaComponent } from '../agregar-editar-area/agregar-editar-area.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-areas',
  templateUrl: './list-areas.component.html',
  styleUrl: './list-areas.component.css'
})
export class ListAreasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'abreviatura', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Area>;
  loading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _areaService: AreaService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.obtenerAreas()
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

  addEditArea(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarAreaComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.obtenerAreas()
      }
    })
  }

  obtenerAreas() {
    this.loading = true
    this._areaService.getAreas().subscribe((data:any) => {
      this.loading = false
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  deleteArea(id: number) {
    this.loading = true
    this._areaService.deleteArea(id).subscribe(() => {
      this.obtenerAreas()
      this.mensajeExito()
    })
  }

  mensajeExito() {
    this._snackBar.open("El área fue eliminado con éxito", '', {
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
        this.deleteArea(id)
      }
    })
  }
}
