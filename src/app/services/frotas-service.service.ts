import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrotasServiceService {
  private frotaUrl;

  constructor(private http: HttpClient) { 
    this.frotaUrl= 'http://localhost:8080/frotas';
  }

  public get(id: Number){
    return this.http.get<any>(`${this.frotaUrl}/${id}`)
  }

  public getAllRegistros(id: Number) {
    return this.http.get<any[]>(`${this.frotaUrl}/${id}/registros`)
  }

  public getAllRegistrosByCategoria(id: Number, categoria: string){
    return this.http.get<any[]>(`${this.frotaUrl}/${id}/registros/${categoria}`)
  }

  public create(frota: String){
    return this.http.post(`${this.frotaUrl}/cadastro`, frota)
  }

  public update(id: Number, frota: String) {
    return this.http.put(`${this.frotaUrl}/${id}`, frota)
  }

  public delete(id: Number){
    return this.http.delete(`${this.frotaUrl}/${id}`)
  }
}
