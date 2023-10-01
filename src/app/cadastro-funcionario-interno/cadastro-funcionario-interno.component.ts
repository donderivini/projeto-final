import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';


@Component({
  selector: 'app-cadastro-funcionario-interno',
  templateUrl: './cadastro-funcionario-interno.component.html',
  styleUrls: ['./cadastro-funcionario-interno.component.css']
})
export class CadastroFuncionarioInternoComponent implements OnInit{

  constructor(private router:Router, private funcionario_service: FuncionarioService){}

  funcCadastro= {nome:'',login: '', senha: '', email: '', cargo:''}

  funcionario: any;

  ngOnInit(): void {
    if(this.funcionario_service.getFuncionario() != null){
      if(this.funcionario_service.getFuncionario().cargo != 'GERENCIA'){
        this.router.navigate(['/home'])
      }
    }else{
      this.router.navigate(['/'])
    }      
  }

  setCadastroInterno(){
    this.funcCadastro.nome = this.funcCadastro.nome.trim()
    this.funcCadastro.login = this.funcCadastro.login.trim()
    this.funcCadastro.senha = this.funcCadastro.senha.trim() 
    this.funcCadastro.email = this.funcCadastro.email.trim()   
    console.log(this.funcCadastro)
    if(this.funcCadastro.nome != ''
    && this.funcCadastro.login != ''
    && this.funcCadastro.senha != ''
    && this.funcCadastro.email != ''
    && this.funcCadastro.cargo != ''){
      if(this.funcCadastro.senha.toString().length >= 5){
        this.funcionario_service.createInterno(this.funcCadastro).subscribe({
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
                window.alert('Funcionário já cadastrado')
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
    console.log(this.funcCadastro)
  }

  btCancelar(){
    this.router.navigate(['/home'])
  }
}
