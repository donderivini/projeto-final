import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Funcionario } from '../model/funcionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private funcionarioUrl;

  constructor(private http: HttpClient){
    this.funcionarioUrl= 'http://localhost:8080/funcionarios';
  }

  public findAll(): Observable<any[]>{
    return this.http.get<any[]>(this.funcionarioUrl)
  }

  public get(id: Number): Observable<any>{
    return this.http.get<any>(`${this.funcionarioUrl}/${id}`)
  }
}
