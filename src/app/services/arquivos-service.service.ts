import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivosServiceService {
  private arquivosUrl

  constructor(private http: HttpClient) { 
    this.arquivosUrl= 'http://192.168.15.118:8080/arquivos';
  }

  public get(id: Number){
    return this.http.get(`${this.arquivosUrl}/${id}`)
  }

  public create(arquivo: String){
    return this.http.post(`${this.arquivosUrl}/cadastro`, arquivo)
  }

  public update(id: Number, arquivo: String){
    return this.http.put(`${this.arquivosUrl}/${id}`, arquivo)
  }

  public delete(id: Number){
    return this.http.delete(`${this.arquivosUrl}/${id}`)
  }
}
