import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';
@Component({
  selector: 'app-update-funcionario-interno',
  templateUrl: './update-funcionario-interno.component.html',
  styleUrls: ['./update-funcionario-interno.component.css']
})
export class UpdateFuncionarioInternoComponent implements OnInit {


  constructor(private router:Router,private funcionario_service:FuncionarioService){}

  funcionario: any

  funcionarioUpdate = {nome: '', senha: '', email: '', cargo: '', ativo: true}

  idFuncionario: any = 0

  listaInternos: any[]=[]

  ngOnInit(): void {
    if(this.funcionario_service.getFuncionario() != null){
      if(this.funcionario_service.getFuncionario().cargo == 'GERENCIA'){
        this.funcionario_service.findAllInterno().subscribe(
          (response) => {
            response.forEach((item) => {
              if(item.ativo && item.id != this.funcionario_service.getFuncionario().id){
                this.listaInternos.push(item)
              }
            })
          }
        )
      }else{
        this.router.navigate(['/home'])
      }
    }
    else{
      this.router.navigate(['/'])
    }
  }

  setFuncionario(){
    if(this.idFuncionario != 0){
      this.funcionario_service.get(this.idFuncionario).subscribe(
        (response) =>{
          this.funcionario = response
          this.funcionarioUpdate.nome = this.funcionario.nome
          this.funcionarioUpdate.senha = this.funcionario.senha
          this.funcionarioUpdate.email = this.funcionario.email
          this.funcionarioUpdate.cargo = this.funcionario.cargo
          this.funcionarioUpdate.ativo = this.funcionario.ativo
        }
      )
    }
    else{
      this.funcionario = null
    }
  }

  btAtualizar(){
    if(this.idFuncionario != 0){
      this.funcionario_service.updateInterno(this.idFuncionario, this.funcionarioUpdate).subscribe({
        next: (data) => {
          if(data != null){
            window.alert('Usuário atualizado')
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
        }
      })
    }
    else{
      window.alert('Selecione um login de funcionario')
    }
  }

  btDeletar(){
    if(this.idFuncionario != 0){
      if(window.confirm('Deletar funcionario?')){
        this.funcionarioUpdate.ativo = false
        this.funcionario_service.updateInterno(this.idFuncionario, this.funcionarioUpdate).subscribe({
          next: (data) => {
            if(data != null){
              window.alert('Usuário deletado')
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
          }
        })
      }
    }
    else{
      window.alert('Selecione um login de funcionario')
    }
  }

  btCancelar(){
    this.router.navigate(['/home'])
  }

}
