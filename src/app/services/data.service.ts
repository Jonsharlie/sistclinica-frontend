import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = new Subject<Producto>();
  data$ = this.data.asObservable();

  constructor() { }

  setData(data: Producto) {
    this.data.next(data)
  }
}
