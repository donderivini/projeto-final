import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EmpresaServiceService } from '../services/empresa-service.service';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-update-empresa',
  templateUrl: './update-empresa.component.html',
  styleUrls: ['./update-empresa.component.css']
})
export class UpdateEmpresaComponent implements OnInit{

  constructor(private router:Router, private empresa_service: EmpresaServiceService, private funcionarioService: FuncionarioService){}

  idEmpresa = 0
  empresa: any

  empresaUpdate= {nome: '', endereco: '', cidade: '', estado: ''}

  listaEmpresas: any[]=[]

  ngOnInit(): void {
      if(this.funcionarioService.getFuncionario() != null){
          if(this.funcionarioService.getFuncionario().cargo != 'GERENCIA'){
            this.router.navigate(['/home'])
          }
          else{
            this.empresa_service.findAll().subscribe(
              (response) => {
                this.listaEmpresas = response
              }
            )
          }
      }
      else{
        this.router.navigate(['/'])
      }
  }

  setEmpresa(){
    console.log(this.idEmpresa)
    if(this.idEmpresa != 0){
      this.empresa_service.get(this.idEmpresa).subscribe(
        (response) => {
          this.empresa = response
          this.empresaUpdate.nome = this.empresa.nome
          this.empresaUpdate.endereco = this.empresa.endereco
          this.empresaUpdate.cidade = this.empresa.cidade
          this.empresaUpdate.estado = this.empresa.estado
        }
      )
    }
    else{
      this.empresa = null
    }
  }

  btDeletar(){
    if(this.idEmpresa != 0){
      if(window.confirm('Deletar a empresa ' + this.empresa.nome + ' do sistema?')){
        this.empresa_service.delete(this.idEmpresa)
        window.alert('Empresa deletada')
        this.router.navigate(['/home'])
      }
    }else{
      window.alert('Selecione uma empresa')
    }
  }

  btAtualizar(){
    if(this.idEmpresa != 0){
      this.empresaUpdate.nome = this.empresaUpdate.nome.trim()
      this.empresaUpdate.endereco = this.empresaUpdate.endereco.trim()
      this.empresaUpdate.cidade = this.empresaUpdate.cidade.trim()    
      console.log(this.empresaUpdate)
      if(this.empresaUpdate.nome != ''
      && this.empresaUpdate.endereco != ''
      && this.empresaUpdate.cidade != ''
      && this.empresaUpdate.estado != ''){
          this.empresa_service.update(this.idEmpresa, this.empresaUpdate).subscribe({
            next: (data) => {
              if (data != null){
                window.alert('Informações da empresa atualizadas')
                this.router.navigate(['/home'])
              }
              else{
                window.alert('Preencha os campos corretamente')    
              }
            },
            error: (err) => {
              console.log('error', err)
              if(err.statusText == 'OK'){                
                window.alert('Ocorreu um erro\n'+ err.message)                
              }else{
                window.alert('Ocorreu um erro de conexão')
              }        
            },
            complete: () => console.log("Completo")
          })
      }
      else{
        window.alert('Preencha os campos corretamente')
      }
    }else{
      window.alert('Selecione uma empresa')
    }
  }

  btCancelar(){
    this.router.navigate(['/home'])
  }
}
