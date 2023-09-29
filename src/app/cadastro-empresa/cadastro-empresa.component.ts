import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EmpresaServiceService } from '../services/empresa-service.service';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit{

  constructor(private router:Router, private empresa_service: EmpresaServiceService, private funcionarioService: FuncionarioService){}

  empresaCadastro= {nome: '', cnpj: '', endereco: '', cidade: '', estado: ''}

  ngOnInit(): void {
      if(this.funcionarioService.getFuncionario() != null){
        if(this.funcionarioService.getFuncionario().empresa == null){
          if(this.funcionarioService.getFuncionario().cargo != 'GERENCIA'){
            this.router.navigate(['/'])
          }
        }
        else{
          this.router.navigate(['/'])
        }
      }
      else{
        this.router.navigate(['/'])
      }
  }

  setCadastro(){
    this.empresaCadastro.nome = this.empresaCadastro.nome.trim()
    this.empresaCadastro.endereco = this.empresaCadastro.endereco.trim()
    this.empresaCadastro.cidade = this.empresaCadastro.cidade.trim()    
    console.log(this.empresaCadastro)
    if(this.empresaCadastro.nome != ''
    && this.empresaCadastro.cnpj != ''
    && this.empresaCadastro.endereco != ''
    && this.empresaCadastro.cidade != ''
    && this.empresaCadastro.estado != ''){
      if(this.empresaCadastro.cnpj.toString().length == 14){
        this.empresa_service.create(this.empresaCadastro).subscribe({
          next: (data) => {
            if (data != null){
              window.alert('Cadastro feito com sucesso')
              this.router.navigate(['/home'])
            }
            else{
              window.alert('Preencha os campos corretamente')    
            }
          },
          error: (err) => {
            console.log('error', err)
            if(err.statusText == 'OK'){
              if(err.status == 500){
                window.alert('CNPJ já cadastrado')
              }
              else{
                window.alert('Ocorreu um erro\n'+ err.message)
              }
            }else{
              window.alert('Ocorreu um erro de conexão')
            }        
          },
          complete: () => console.log("Completo")
        })
      }else{
        window.alert('CNPJ inválido')
      }
    }
    else{
      window.alert('Preencha os campos corretamente')
    }
    
  }

  btCancelar(){
    this.router.navigate(['/home'])
  }
}
