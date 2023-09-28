import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrosServiceService {
  private registrosUrl

  constructor(private http: HttpClient) { 
    this.registrosUrl= 'http://192.168.15.118:8080/registros';
  }

  public get(id: Number): Observable<any>{
    return this.http.get<any>(`${this.registrosUrl}/${id}`)
  }

  public getAllArquivos(id: Number):  Observable<any[]> {
    return this.http.get<any[]>(`${this.registrosUrl}/${id}/arquivos`)
  }

  public create(registros: String): Observable<any[]>{
    return this.http.post<any[]>(`${this.registrosUrl}/cadastro`, registros)
  }

  public update(id: Number, registros: String): Observable<any[]> {
    return this.http.put<any[]>(`${this.registrosUrl}/${id}`, registros)
  }

  public delete(id: Number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.registrosUrl}/${id}`)
  }

  public getAll(){
    return this.http.get<any[]>(this.registrosUrl)
  }

  public getAllByCategoria(categoria: String) {
    return this.http.get<any[]>(`${this.registrosUrl}/${categoria}`)
  }

  public getAllCategorias() {
    return this.http.get<any[]>(`${this.registrosUrl}/categorias`)
  }
}
