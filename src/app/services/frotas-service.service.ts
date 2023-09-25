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

  public get(id: Number): Observable<any>{
    return this.http.get<any>(`${this.frotaUrl}/${id}`)
  }

  public getAllRegistros(id: Number):  Observable<any[]> {
    return this.http.get<any[]>(`${this.frotaUrl}/${id}/registros`)
  }

  public create(frota: String): Observable<any[]>{
    return this.http.post<any[]>(`${this.frotaUrl}/cadastro`, frota)
  }

  public update(id: Number, frota: String): Observable<any[]> {
    return this.http.put<any[]>(`${this.frotaUrl}/${id}`, frota)
  }

  public delete(id: Number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.frotaUrl}/${id}`)
  }
}
