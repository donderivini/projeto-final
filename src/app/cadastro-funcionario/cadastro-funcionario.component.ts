import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent {
  
  constructor(private router: Router, private funcionario_service: FuncionarioService){}

  btCancelar(){
    this.router.navigate(['/home'])
  }

  funcLogin= {nome:'', login: '', senha: '', email:'', empresa:''}

  funcionario: any;

  getCadastro(){
    this.funcionario_service.createCliente(this.funcLogin).subscribe(
      (response) => {
        if (response != null){
          window.alert('Cadastro feito com sucesso')
          this.router.navigate(['/home'])
        }
        else{
          window.alert('Preencha os campos corretamente')
        }
      }
    )
  }
}
