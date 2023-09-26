import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Funcionario } from '../model/funcionario';
import { LoginForm } from '../model/login-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private funcionarioUrl;
  private funcionario: any

  constructor(private http: HttpClient){
    this.funcionarioUrl= 'http://localhost:8080/funcionarios';
  }

  public setFuncionario(funcionario: any){
    this.funcionario = funcionario
  }

  public getFuncionario(): any{
    return this.funcionario;
  }

  public createInterno(funcionario: any): Observable<any>{
    return this.http.post<any>(`${this.funcionarioUrl}/cadastro/interno`, funcionario)
  }

  public createCliente(funcionario: any): Observable<any>{
    return this.http.post<any>(`${this.funcionarioUrl}/cadastro/cliente`, funcionario)
  }

  public updateCliente(id: Number, funcionario: any): Observable<any>{
    return this.http.put<any>(`${this.funcionarioUrl}/cliente/${id}`, funcionario)
  }

  public updateInterno(id: Number, funcionario: any): Observable<any>{
    return this.http.put<any>(`${this.funcionarioUrl}/interno/${id}`, funcionario)
  }
  
  public get(id: Number): Observable<any>{
    return this.http.get<any>(`${this.funcionarioUrl}/${id}`)
  }
  
  public findAll(): Observable<any[]>{
    return this.http.get<any[]>(this.funcionarioUrl)
  }

  public findAllCliente(): Observable<any[]>{
    return this.http.get<any[]>(`${this.funcionarioUrl}/clientes`)
  }

  public findAllInterno(): Observable<any[]>{
    return this.http.get<any[]>(`${this.funcionarioUrl}/internos`)
  }

  public findAllInternoByCargo(cargo: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.funcionarioUrl}/internos/${cargo}`)
  }

  public findAllRegistros(id: Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.funcionarioUrl}/${id}/registros`)
  }

  public delete(id: Number): void{
    this.http.delete(`${this.funcionarioUrl}/${id}`)
  }

  login(funcionario_login: any) {
    return this.http.post(`${this.funcionarioUrl}/login`, funcionario_login)
  }

}
