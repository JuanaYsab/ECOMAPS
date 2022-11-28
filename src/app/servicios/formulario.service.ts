import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recicladoras } from '../interfaces/recicladoras.interface';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  url: string = "http://localhost:3000/formulario";

  constructor(
    private http: HttpClient
  ) { }

  post(formulario: Recicladoras): Observable<any> {
    return this.http.post(this.url, formulario, { responseType: "text" });
}
}
