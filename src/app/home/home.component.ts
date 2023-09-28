import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';
import { EmpresaServiceService } from '../services/empresa-service.service';
import { FrotasServiceService } from '../services/frotas-service.service';
import { RegistrosServiceService } from '../services/registros-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  funcionario: any
  empresa: any = null
  idEmpresaEscolhida: any = ''
  idFrotaEscolhida: any = ''
  categoria: any = ''

  funcionarioCliente: boolean = true
  gerencia: boolean = false
  
  listaEmpresas: any[] = []
  listaFrotas: any[] = []
  listaRegistros: any[] = []

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private empresaService:  EmpresaServiceService,
    private frotaService: FrotasServiceService,
    private registroService: RegistrosServiceService
  ){}

  ngOnInit(): void {
    this.funcionario = this.funcionarioService.getFuncionario()
    console.log(this.funcionario)
    if(this.funcionario.empresa != null){
      this.funcionarioCliente = true;
      this.empresaService.get(this.funcionario.empresa.id).subscribe(
        (response) => {
          this.empresa = response
          this.idEmpresaEscolhida = this.empresa.id
        }
      )
      this.empresaService.findAllFrotas(this.idEmpresaEscolhida).subscribe(
        (response) => {
          this.listaFrotas = response
        }
      )
    }
    else{
      this.funcionarioCliente = false;
      this.funcionario.cargo == 'GERENCIA' ? this.gerencia = true : this.gerencia = false

      this.empresaService.findAll().subscribe(
        (response) => {
          this.listaEmpresas = response
        }
      )

    }

  }

  setRegistros(){
    if(this.idEmpresaEscolhida != ''){
      if(this.idFrotaEscolhida != ''){
        if(this.categoria != ''){
          this.frotaService.getAllRegistrosByCategoria(this.idFrotaEscolhida, this.categoria).subscribe(
            (response) => {
              this.listaRegistros = response
            }
          )
        }
        else{
          this.frotaService.getAllRegistros(this.idFrotaEscolhida).subscribe(
            (response) => {
              this.listaRegistros = response
            }
          )
        }
      }
      else if(this.categoria != ''){
        this.empresaService.findAllRegistrosByCategoria(this.idEmpresaEscolhida, this.categoria).subscribe(
          (response) => {
            this.listaRegistros = response
          }
        )
      }
      else{
        this.empresaService.findAllRegistros(this.idEmpresaEscolhida).subscribe(
          (response) => {
            this.listaRegistros = response
          }
        )
      }
    }
    else if (this.categoria != ''){
      this.registroService.getAllByCategoria(this.categoria).subscribe(
        (response) => {
          this.listaRegistros = response
        }
      )
    }
    else{
      this.registroService.getAll().subscribe(
        (response) => {
          this.listaRegistros = response
        }
      )
    }

    this.listaRegistros.forEach(function (value) {
      value.frota = value.frota.nome
    })
  }

  logOut(){
    this.funcionarioService.setFuncionario(null)
    this.router.navigate([''])
  }

  goToCadastroFuncionario(){
    this.router.navigate(['/cadastro-funcionario'])
  }

  goToCadastroFuncionarioInterno(){
    this.router.navigate(['/cadastro-funcionario-interno'])
  }

  goToCadastroEmpresa(){
    this.router.navigate(['/cadastro-empresa'])
  }

  goToCadastroRegistro(){
    this.router.navigate(['/cadastro-registro'])
  }

  goToCadastroFrotas(){
    this.router.navigate(['/cadastro-frota'])
  }

}
