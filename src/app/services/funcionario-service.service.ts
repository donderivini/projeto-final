import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public createInterno(funcionario: any){
    return this.http.post(`${this.funcionarioUrl}/cadastro/interno`, funcionario)
  }

  public createCliente(funcionario: any){
    return this.http.post(`${this.funcionarioUrl}/cadastro/cliente`, funcionario)
  }

  public updateCliente(id: Number, funcionario: any){
    return this.http.put(`${this.funcionarioUrl}/cliente/${id}`, funcionario)
  }

  public updateInterno(id: Number, funcionario: any){
    return this.http.put(`${this.funcionarioUrl}/interno/${id}`, funcionario)
  }
  
  public get(id: Number){
    return this.http.get(`${this.funcionarioUrl}/${id}`)
  }
  
  public findAll(){
    return this.http.get<any[]>(this.funcionarioUrl)
  }

  public findAllCliente(){
    return this.http.get<any[]>(`${this.funcionarioUrl}/clientes`)
  }

  public findAllInterno(){
    return this.http.get<any[]>(`${this.funcionarioUrl}/internos`)
  }

  public findAllInternoByCargo(cargo: string){
    return this.http.get<any[]>(`${this.funcionarioUrl}/internos/${cargo}`)
  }

  public findAllCargos(){
    return this.http.get<any[]>(`${this.funcionarioUrl}/cargos`)
  }

  public findAllRegistros(id: Number){
    return this.http.get<any[]>(`${this.funcionarioUrl}/${id}/registros`)
  }

  public delete(id: Number): void{
    this.http.delete(`${this.funcionarioUrl}/${id}`)
  }

  login(funcionario_login: any) {
    return this.http.post(`${this.funcionarioUrl}/login`, funcionario_login)
  }

}
