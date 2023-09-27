import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../model/funcionario';
import { FuncionarioService } from '../services/funcionario-service.service';
import { EmpresaServiceService } from '../services/empresa-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  funcionario: any
  empresa: any

  funcionarioCliente: boolean = true

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private empresaService:  EmpresaServiceService
  ){}

  ngOnInit(): void {
    this.funcionario = this.funcionarioService.getFuncionario()
    console.log(this.funcionario)
    if(this.funcionario.empresa != null){
      this.funcionarioCliente = true;
    }
    else{
      this.funcionarioCliente = false;
    }

  }

  logOut(){
    this.funcionarioService.setFuncionario(null)
    this.router.navigate([''])
  }

  goToCadastroFuncionario(){
    this.router.navigate(['/cadastro-funcionario'])
  }

}
