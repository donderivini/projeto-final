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
      this.empresa_service.findAll().subscribe(
        (response) => {
          this.listaEmpresas = response
        }
      )
  }

  cadastrar(){
    console.log(this.funcLogin)
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
  
  btCancelar(){
    this.router.navigate(['/home'])
  }
}
