import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';
import { EmpresaServiceService } from '../services/empresa-service.service';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit{
  
  constructor(private router: Router, private funcionario_service: FuncionarioService, private empresa_service: EmpresaServiceService){}

  

  funcLogin= {nome:'', login: '', senha: '', email:'', idEmpresa: ''}

  listaEmpresas: any[]=[]

  ngOnInit(): void {
    if(this.funcionario_service.getFuncionario() != null){
      if(this.funcionario_service.getFuncionario().cargo == 'GERENCIA'){
        this.empresa_service.findAll().subscribe(
          (response) => {
            this.listaEmpresas = response
          }
        )
      }else{
        this.router.navigate(['/home'])
      }
    }else{
      this.router.navigate(['/'])
    }
  }

  cadastrar(){
    this.funcLogin.nome = this.funcLogin.nome.trim()
    this.funcLogin.login = this.funcLogin.login.trim()
    this.funcLogin.senha = this.funcLogin.senha.trim() 
    this.funcLogin.email = this.funcLogin.email.trim()   
    console.log(this.funcLogin)
    if(this.funcLogin.nome != ''
    && this.funcLogin.login != ''
    && this.funcLogin.senha != ''
    && this.funcLogin.email != ''
    && this.funcLogin.idEmpresa != ''){
      if(this.funcLogin.senha.toString().length >= 5){
        this.funcionario_service.createCliente(this.funcLogin).subscribe({
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
                window.alert('Login já cadastrado')
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
        window.alert('A senha precisa ter 5 dígitos')
      }
    }
    else{
      window.alert('Preencha os campos corretamente')
    }
    console.log(this.funcLogin)
  }
  
  btCancelar(){
    this.router.navigate(['/home'])
  }
}
