import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';


@Component({
  selector: 'app-cadastro-funcionario-interno',
  templateUrl: './cadastro-funcionario-interno.component.html',
  styleUrls: ['./cadastro-funcionario-interno.component.css']
})
export class CadastroFuncionarioInternoComponent {

  constructor(private router:Router, private funcionario_service: FuncionarioService){}

  funcCadastro= {nome:'',login: '', senha: '', email: '', cargo:''}

  funcionario: any;

  setCadastroInterno(){
    this.funcionario_service.createInterno(this.funcCadastro).subscribe(
      (response) => {
        if (response != null){
          window.alert('Cadastro feito com sucesso')
          this.router.navigate(['/home'])
        }
        else {
          window.alert('Preencha os campos corretamente')
        }
      }
    )
  }
}
