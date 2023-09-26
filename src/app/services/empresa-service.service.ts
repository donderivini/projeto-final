import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServiceService {

  private empresaUrl

  constructor(private http:HttpClient) { 
    this.empresaUrl = 'http://localhost:8080/empresas'
  }

  public create(empresa: any){
    return this.http.post(`${this.empresaUrl}/cadastro`, empresa)
  }

  public get(id: Number){
    return this.http.get(`${this.empresaUrl}/${id}`)
  }

  public update(id: Number, empresa: any){
    return this.http.put(`${this.empresaUrl}/${id}`, empresa)
  }

  public findAll(){
    return this.http.get(this.empresaUrl)
  }

  public findAllByEstado(estado: string){
    return this.http.get(`${this.empresaUrl}/${estado}`)
  }

  public findAllFuncionarios(id:Number){
    return this.http.get(`${this.empresaUrl}/${id}/funcionarios`)
  }

  public findAllFrotas(id:Number){
    return this.http.get(`${this.empresaUrl}/${id}/frotas`)
  }

  public findAllRegistros(id:Number){
    return this.http.get(`${this.empresaUrl}/${id}/registros`)
  }

  public findAllRegistrosByCategoria(id:Number, categoria: string){
    return this.http.get(`${this.empresaUrl}/${id}/registros/${categoria}`)
  }

  public delete(id: Number){
    this.http.delete(`${this.empresaUrl}/${id}`)
  }
}
