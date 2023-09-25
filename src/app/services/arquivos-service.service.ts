import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivosServiceService {
  private arquivosUrl

  constructor(private http: HttpClient) { 
    this.arquivosUrl= 'http://localhost:8080/arquivos';
  }

  public get(id: Number): Observable<any>{
    return this.http.get<any>(`${this.arquivosUrl}/${id}`)
  }

  public create(arquivo: String): Observable<any[]>{
    return this.http.post<any[]>(`${this.arquivosUrl}/cadastro`, arquivo)
  }

  public update(id: Number, arquivo: String): Observable<any[]> {
    return this.http.put<any[]>(`${this.arquivosUrl}/${id}`, arquivo)
  }

  public delete(id: Number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.arquivosUrl}/${id}`)
  }
}
