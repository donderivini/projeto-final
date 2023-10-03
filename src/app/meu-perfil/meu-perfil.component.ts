import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../services/funcionario-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit{

  constructor(private router:Router, private funcionario_service: FuncionarioService) {}

  funcionarioCliente = {nome: '', senha: '', email: '', ativo: true}
  funcionarioInterno = {nome: '', senha: '', email: '',cargo: '', ativo: true}
  funcionarioLogado: any
  funcionario: any
  cliente: boolean = true

  edtNome: boolean = false
  edtEmail: boolean = false
  edtSenha: boolean = false

  senhaAtual: string =''
  senhaNova: string =''
  senhaConfirm: string =''

  ngOnInit(): void {
        this.funcionarioLogado = this.funcionario_service.getFuncionario()
      if (this.funcionario_service.getFuncionario() != null){   
        if (this.funcionarioLogado.empresa != null) {
          this.cliente = true
          this.funcionarioCliente.nome = this.funcionarioLogado.nome
          this.funcionarioCliente.senha = this.funcionarioLogado.senha
          this.funcionarioCliente.email = this.funcionarioLogado.email
          this.funcionario = this.funcionarioCliente
        }else{
          this.cliente = false
          this.funcionarioInterno.nome = this.funcionarioLogado.nome
          this.funcionarioInterno.senha = this.funcionarioLogado.senha
          this.funcionarioInterno.email = this.funcionarioLogado.email
          this.funcionarioInterno.cargo = this.funcionarioLogado.cargo
          this.funcionario = this.funcionarioInterno
        }
      }else {
        this.router.navigate(['/'])
      }
  }

  btAtualizar() {
    console.log(this.funcionario)
    if(window.confirm('Salvar alterações?')){
      let verif: boolean = true

      this.edtNome? verif = (this.funcionario.nome != '' && this.funcionario.nome.length >= 5): null;
      this.edtEmail? verif = (this.funcionario.email != '' && this.funcionario.email.length >= 5): null;
      this.edtSenha? verif = (this.senhaAtual == this.funcionario.senha && this.senhaNova.length >= 5 && this.senhaNova===this.senhaConfirm): null;
      
      
      if(verif){
        this.edtSenha? this.funcionario.senha = this.senhaNova:null;
        if(this.cliente){
          this.funcionario_service.updateCliente(this.funcionarioLogado.id, this.funcionario).subscribe({
            next: (data) => {
              if(data != null){
                window.alert('As alterações foram salvas.')
                this.edtSenha? this.router.navigate(['/']) : this.router.navigate(['/home'])
              }
              else{ window.alert('Ocorreu um erro')}
            },
            error: (err) => {            
              if(err.statusText == 'OK'){                
                window.alert('Ocorreu um erro\n'+ err.message)                
              }else{
                window.alert('Ocorreu um erro de conexão')
              }        
            }
          })
        }
        else{
          this.funcionario_service.updateInterno(this.funcionarioLogado.id, this.funcionario).subscribe({
            next: (data) => {
              if(data != null){
                window.alert('As alterações foram salvas.')
                this.router.navigate(['/home'])
              }
              else{ window.alert('Ocorreu um erro')}
            },
            error: (err) => {            
              if(err.statusText == 'OK'){                
                window.alert('Ocorreu um erro\n'+ err.message)                
              }else{
                window.alert('Ocorreu um erro de conexão')
              }        
            }
          })
        }
      }else{
        verif = true

        this.edtNome? verif = (this.funcionario.nome != ''):null;
        this.edtEmail? verif = (this.funcionario.email != ''):null;
        this.edtSenha? verif = (this.senhaAtual != '' && this.senhaNova != '' && this.senhaConfirm != ''):null;
        
        if(verif){
          if(this.edtNome && this.funcionario.nome.length < 5){
            window.alert('O nome deve possuir pelo menos 5 caracteres')
          }
          else if(this.edtEmail && this.funcionario.email.length < 5){
            window.alert('Email inválido')
          } else if (this.edtSenha){
            if(this.funcionario.senha != this.senhaAtual){
              window.alert('Senha incorreta!')
            }
            else if(this.senhaNova != this.senhaConfirm){
              window.alert('As senhas não correspondem')
            }
            else if(this.senhaNova.length < 5){
              window.alert('A nova senha deve ter pelo menos 5 caracteres')
            }
          }
        }
        else{ window.alert('Preencha os campos')}
      }
    }
  }

  btDesativar(){
    if(window.confirm('Deletar conta?')){
      this.funcionario.ativo = false
      if(this.cliente){
        this.funcionario_service.updateCliente(this.funcionarioLogado.id, this.funcionario).subscribe({
          next: (data) => {
            if(data != null){
              window.alert('Sua conta foi desativada')
              this.router.navigate(['/'])
            }
            else{ window.alert('Ocorreu um erro')}
          },
          error: (err) => {            
            if(err.statusText == 'OK'){                
              window.alert('Ocorreu um erro\n'+ err.message)                
            }else{
              window.alert('Ocorreu um erro de conexão')
            }        
          }
        })
      }
      else{
        this.funcionario_service.updateInterno(this.funcionarioLogado.id, this.funcionario).subscribe({
          next: (data) => {
            if(data != null){
              window.alert('Sua conta foi desativada')
              this.router.navigate(['/'])
            }
            else{ window.alert('Ocorreu um erro')}
          },
          error: (err) => {            
            if(err.statusText == 'OK'){                
              window.alert('Ocorreu um erro\n'+ err.message)                
            }else{
              window.alert('Ocorreu um erro de conexão')
            }        
          }
        })
      }
    }
  }

  btCancelar() {
    this.router.navigate(['/home'])
  }
}
