import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivosServiceService {
  private arquivosUrl

  constructor(private http: HttpClient) { 
    // this.arquivosUrl= 'http://192.168.15.118:8080/arquivos';
    this.arquivosUrl= 'http://localhost:8080/arquivos';
  }

  upload(file: File, idRegistro: Number) {
    const formData: FormData = new FormData()

    formData.append('file', file)

    const req = new HttpRequest('POST', `${this.arquivosUrl}/upload/${idRegistro}`, formData, {
      reportProgress: true, responseType: 'json'
    })

    return this.http.request(req)
  }

  public get(id: Number){
    return this.http.get(`${this.arquivosUrl}/${id}`)
  }

  public create(arquivo: String){
    return this.http.post(`${this.arquivosUrl}/criarArquivo`, arquivo)
  }

  public update(id: Number, arquivo: String){
    return this.http.put(`${this.arquivosUrl}/update/${id}`, arquivo)
  }

  public delete(id: Number){
    return this.http.delete(`${this.arquivosUrl}/delete/${id}`)
  }
}
