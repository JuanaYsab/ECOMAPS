import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recicladoras } from '../interfaces/recicladoras.interface';

@Injectable({
    providedIn: 'root'
  })
  export class AdministrarService {
  
    url: string = 'http://localhost:3000/administrar';
  
    constructor(
      private http: HttpClient
    ) { }

    private obtenerCabeceras(contentType?: string): HttpHeaders{
      let cabeceras: HttpHeaders = new HttpHeaders();
      if(contentType) cabeceras = cabeceras.append('Content-Type', contentType);
      const token: string | null = localStorage.getItem('token');
      if(token) cabeceras = cabeceras.append('Authorization', `Bearer ${token}`);
      return cabeceras;
    }

    public get(): Observable<Recicladoras[]>{ 
      return this.http.get<Recicladoras[]>(this.url, {headers: this.obtenerCabeceras()});
    }
  
    public post(recicladora: Recicladoras): Observable<any>{
      return this.http.post(this.url, recicladora, {responseType: 'text'});
    }
  
    public put(recicladora: Recicladoras): Observable<any>{
      return this.http.post(this.url, recicladora, {responseType: 'text', headers: this.obtenerCabeceras('application/json')});    }
  
    public delete(recicladora: Recicladoras): Observable<any>{
      return this.http.delete(`${this.url}/${recicladora.idrecicladora}`, {responseType: 'text', headers: this.obtenerCabeceras('application/json')});
    }

  }