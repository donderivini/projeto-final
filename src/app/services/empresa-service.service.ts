import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServiceService {

  private empresaUrl

  constructor(private http:HttpClient) { 
    //this.empresaUrl = 'http://192.168.15.118:8080/empresas'
    this.empresaUrl= 'http://localhost:8080/empresas';
  }

  public create(empresa: any){
    return this.http.post(`${this.empresaUrl}/cadastro`, empresa).pipe(catchError(this.handleError))
  }

  public get(id: Number){
    return this.http.get(`${this.empresaUrl}/${id}`)
  }

  public update(id: Number, empresa: any){
    return this.http.put(`${this.empresaUrl}/update/${id}`, empresa)
  }

  public findAll(){
    return this.http.get<any[]>(this.empresaUrl)
  }

  public findAllByEstado(estado: string){
    return this.http.get<any[]>(`${this.empresaUrl}/estados/${estado}`)
  }

  public findAllEstado(){
    return this.http.get<any[]>(`${this.empresaUrl}/estados`)
  }

  public findAllFuncionarios(id:Number){
    return this.http.get(`${this.empresaUrl}/${id}/funcionarios`)
  }

  public findAllFrotas(id:Number){
    return this.http.get<any[]>(`${this.empresaUrl}/${id}/frotas`)
  }

  public findAllRegistros(id:Number){
    return this.http.get<any[]>(`${this.empresaUrl}/${id}/registros`)
  }

  public findAllRegistrosByCategoria(id:Number, categoria: string){
    return this.http.get<any[]>(`${this.empresaUrl}/${id}/registros/${categoria}`)
  }

  public delete(id: Number){
    return this.http.delete<any>(`${this.empresaUrl}/delete/${id}`)
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
