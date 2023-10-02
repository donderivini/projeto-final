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
  funcionario: any
  cliente: boolean = true
  editando: boolean = false
  senha1: any = ''
  senha2: any = ''
  ngOnInit(): void {
      if (this.funcionario_service.getFuncionario() != null){
        this.funcionario = this.funcionario_service.getFuncionario()
        this.funcionarioCliente.nome = this.funcionario.nome
        this.funcionarioCliente.senha = this.funcionario.senha
        this.funcionarioCliente.email = this.funcionario.email
        this.funcionarioInterno.nome = this.funcionario.nome
        this.funcionarioInterno.senha = this.funcionario.senha
        this.funcionarioInterno.email = this.funcionario.email
        this.funcionarioInterno.cargo = this.funcionario.cargo
        if (this.funcionario.empresa != null) {
          this.cliente = true
        }else{
          this.cliente = false
        }
      }else {
        this.router.navigate(['/'])
      }
  }

  editarUsuario() {
    this.editando = true
  }

  btAtualizar() {
    if(window.confirm('Salvar alterações?'))
    {  if (this.funcionario.nome != '' && this.funcionario.email != ''){
        this.funcionarioCliente.nome = this.funcionario.nome
        this.funcionarioCliente.email = this.funcionario.email
        this.funcionarioInterno.nome = this.funcionario.nome
        this.funcionarioInterno.email = this.funcionario.email
        if (this.senha1 != '') {
          if (this.senha2 == '') {          
            window.alert('Confirme a nova senha')
          }else {
            if (this.senha1 != this.senha2) {
              window.alert('As senhas devem ser iguais')
            }else{
              if (this.senha1.length < 5) {
                window.alert('Senha muito curta')
              }else{
                if(window.confirm('Salvar alterações?')){
                  if(this.cliente) {
                    this.funcionarioCliente.senha = this.senha1
                    this.funcionario_service.updateCliente(this.funcionario.id, this.funcionarioCliente).subscribe({
                      next: (data) => {
                        if (data != null) {
                          window.alert('Alterações salvas')
                          this.router.navigate(['/home'])
                        }else{
                          window.alert('Ocorreu um erro')
                        }
                      },          
                      error: (err) => {
                        console.log('error', err)
                        if(err.statusText == 'OK'){                
                          window.alert('Ocorreu um erro\n'+ err.message)                
                        }else{
                          window.alert('Ocorreu um erro de conexão')
                        }        
                      }
                    });
                  }else{this.funcionarioInterno.senha = this.senha1
                    this.funcionario_service.updateInterno(this.funcionario.id, this.funcionarioInterno).subscribe({
                      next: (data) => {
                        if (data != null) {
                          window.alert('Alterações salvas')
                          this.router.navigate(['/home'])
                        }else{
                          window.alert('Ocorreu um erro')
                        }
                      },          
                      error: (err) => {
                        console.log('error', err)
                        if(err.statusText == 'OK'){                
                          window.alert('Ocorreu um erro\n'+ err.message)                
                        }else{
                          window.alert('Ocorreu um erro de conexão')
                        }        
                      }
                    });
                  }
                }
              }
            }
          }
        }else {
          if(this.cliente) {
            this.funcionario_service.updateCliente(this.funcionario.id, this.funcionarioCliente).subscribe({
              next: (data) => {
                if (data != null) {
                  window.alert('Alterações salvas')
                  this.router.navigate(['/home'])
                }else{
                  window.alert('Ocorreu um erro')
                }
              },          
              error: (err) => {
                console.log('error', err)
                if(err.statusText == 'OK'){                
                  window.alert('Ocorreu um erro\n'+ err.message)                
                }else{
                  window.alert('Ocorreu um erro de conexão')
                }        
              }
            });
          }else{
            this.funcionario_service.updateInterno(this.funcionario.id, this.funcionarioInterno).subscribe({
              next: (data) => {
                if (data != null) {
                  window.alert('Alterações salvas')
                  this.router.navigate(['/home'])
                }else{
                  window.alert('Ocorreu um erro')
                }
              },          
              error: (err) => {
                console.log('error', err)
                if(err.statusText == 'OK'){                
                  window.alert('Ocorreu um erro\n'+ err.message)                
                }else{
                  window.alert('Ocorreu um erro de conexão')
                }        
              }
            });
          }
        }
      }else{
        window.alert('Campo nome ou email vazios')
      }}
  }

  btDesativar(){
    if(window.confirm('Desativar sua conta?')){
      this.funcionarioCliente.ativo = false
      this.funcionarioInterno.ativo = false
      if(this.cliente){
        this.funcionario_service.updateCliente(this.funcionario.id, this.funcionarioCliente).subscribe({
          next: (data) => {
            if (data != null) {
              window.alert('Conta deletada')
              this.router.navigate(['/'])
            }else{
              window.alert('Ocorreu um erro')
            }
          },          
          error: (err) => {
            console.log('error', err)
            if(err.statusText == 'OK'){                
              window.alert('Ocorreu um erro\n'+ err.message)                
            }else{
              window.alert('Ocorreu um erro de conexão')
            }        
          }
        });
      }else{
        this.funcionario_service.updateInterno(this.funcionario.id, this.funcionarioInterno).subscribe({
          next: (data) => {
            if (data != null) {
              window.alert('Conta deletada')
              this.router.navigate(['/'])
            }else{
              window.alert('Ocorreu um erro')
            }
          },          
          error: (err) => {
            console.log('error', err)
            if(err.statusText == 'OK'){                
              window.alert('Ocorreu um erro\n'+ err.message)                
            }else{
              window.alert('Ocorreu um erro de conexão')
            }        
          }
        });
      }
    }
  }

  btCancelar() {
    this.router.navigate(['/home'])
  }
}
