import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrosServiceService {
  private registrosUrl

  constructor(private http: HttpClient) { 
    // this.registrosUrl= 'http://192.168.15.118:8080/registros';
    this.registrosUrl= 'http://localhost:8080/registros';
  }

  public get(id: Number){
    return this.http.get(`${this.registrosUrl}/${id}`)
  }

  public getAllArquivos(id: Number) {
    return this.http.get<any[]>(`${this.registrosUrl}/${id}/arquivos`)
  }

  public create(registros: String) {
    return this.http.post<any[]>(`${this.registrosUrl}/cadastro`, registros)
  }

  public update(id: Number, registros: String) {
    return this.http.put<any[]>(`${this.registrosUrl}/update/${id}`, registros)
  }

  public delete(id: Number) {
    return this.http.delete<any[]>(`${this.registrosUrl}/delete/${id}`)
  }

  public getAll(){
    return this.http.get<any[]>(this.registrosUrl)
  }

  public getAllByCategoria(categoria: String) {
    return this.http.get<any[]>(`${this.registrosUrl}/categorias/${categoria}`)
  }

  public getAllCategorias() {
    return this.http.get<any[]>(`${this.registrosUrl}/categorias`)
  }
}
