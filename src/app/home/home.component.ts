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

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private empresaService:  EmpresaServiceService,
    private frotaService: FrotasServiceService,
    private registroService: RegistrosServiceService
  ){}

  funcionario: any
  
  idEmpresa: any = 0
  idFrota: any = 0
  categoria: any = ''

  cliente: boolean = true
  gerencia: boolean = false
  cadastrar: boolean = false
  gerenciar: boolean = false

  listaEmpresas: any[]=[]
  listaFrotas: any[]=[]
  listaRegistros: any[]=[]
  
  ngOnInit(): void {
    if(this.funcionarioService.getFuncionario() != null){
      this.funcionario = this.funcionarioService.getFuncionario()

      if(this.funcionario.empresa == null){
        this.empresaService.findAll().subscribe(
          (response) => {
            this.listaEmpresas = response
          }
        )

        this.cliente = false
        if(this.funcionario.cargo == 'GERENCIA'){
          this.gerencia = true
          this.registroService.getAll().subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano 
              })
              this.listaRegistros = response
            }
          )
        }
        else{
          this.registroService.getAll().subscribe(
            (response) => {
              response.forEach((value)=>{    
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano
              })
              this.listaRegistros = response
            }
          )
        }
      }else{
        this.idEmpresa = this.funcionario.empresa.id

        this.empresaService.findAllFrotas(this.idEmpresa).subscribe(
          (response) => {
            this.listaFrotas = response
          }
        )

        this.empresaService.findAllRegistros(this.idEmpresa).subscribe(
          (response) => {
            response.forEach((value)=>{
              let dia = value.dataResgistro.substring(8,10)
              let mes = value.dataResgistro.substring(5,7)
              let ano = value.dataResgistro.substring(0,4)
              value.dataResgistro = dia + '/' + mes +'/' + ano      
            })
            this.listaRegistros = response
          }
        )
      }  
    }else{
      this.router.navigate(['/'])
    }
    
  }

  setFrotas(){
    if(this.idEmpresa != 0){
      this.empresaService.findAllFrotas(this.idEmpresa).subscribe(
        (response) => {
          this.listaFrotas = response
        }
      )
    }else{
      this.idFrota = 0
    }

    this.setRegistros()
  }

  setRegistros(){
    if(this.idEmpresa == 0){
      if(this.funcionario.cargo == 'GERENCIA'){
        if(this.categoria == ''){
          this.registroService.getAll().subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano               
              })
              this.listaRegistros = response
            }
          )
        }
        else{
          this.registroService.getAllByCategoria(this.categoria).subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano                
              })
              this.listaRegistros = response
            }
          )
        }
      }
      else{
        if(this.categoria == ''){
          this.funcionarioService.findAllRegistros(this.funcionario.id).subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano                
              })
              this.listaRegistros = response
            }
          )
        }
        else{
          this.funcionarioService.findAllRegistrosByCategoria(this.funcionario.id, this.categoria).subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano                
              })
              this.listaRegistros = response
            }
          )
        }
      }
    }
    else{
      if(this.idFrota == 0){
        if(this.categoria == ''){
          this.empresaService.findAllRegistros(this.idEmpresa).subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano                
              })
              this.listaRegistros = response
            }
          )
        }
        else{
          this.empresaService.findAllRegistrosByCategoria(this.idEmpresa,this.categoria).subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano                
              })
              this.listaRegistros = response
            }
          )
        }
      }
      else{
        if(this.categoria == ''){
          this.frotaService.getAllRegistros(this.idFrota).subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano               
              })
              this.listaRegistros = response
            }
          )
        }
        else{
          this.frotaService.getAllRegistrosByCategoria(this.idFrota,this.categoria).subscribe(
            (response) => {
              response.forEach((value)=>{
                let dia = value.dataResgistro.substring(8,10)
                let mes = value.dataResgistro.substring(5,7)
                let ano = value.dataResgistro.substring(0,4)
                value.dataResgistro = dia + '/' + mes +'/' + ano                
              })
              this.listaRegistros = response
            }
          )
        }
      }
    }

    console.log(this.listaRegistros)

  }

  mostraRegistro(id: any){
    this.registroService.get(id).subscribe({
      next: (data) => {
        if(data != null){
        this.registroService.setRegistro(data)
        this.router.navigate(['/consulta-registro'])
      } else window.alert('Ocorreu um erro!')
      },
      error: (err) => {
        console.log('error', err)
        this.registroService.setRegistro(null)
        window.alert('Ocorreu um erro de conexão')
      }

    })
  }

  logOut(){
    this.funcionarioService.setFuncionario(null)
    this.router.navigate(['/'])
  }

  perfil(){
    this.router.navigate(['/meu-perfil'])
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

  btCadastrar(){
    this.cadastrar = !this.cadastrar
  }

  goToUpdateFuncionario(){
    this.router.navigate(['/update-funcionario'])
  }

  goToUpdateFuncionarioInterno(){
    this.router.navigate(['/update-funcionario-interno'])
  }

  goToUpdateEmpresa(){
    this.router.navigate(['/update-empresa'])
  }

  goToUpdateFrotas(){
    this.router.navigate(['/update-frota'])
  }

  btGerenciar(){
    this.gerenciar = !this.gerenciar
  }
}
