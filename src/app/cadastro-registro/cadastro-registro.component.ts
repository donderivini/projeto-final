import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaServiceService } from '../services/empresa-service.service';
import { FrotasServiceService } from '../services/frotas-service.service';
import { RegistrosServiceService } from '../services/registros-service.service';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-cadastro-registro',
  templateUrl: './cadastro-registro.component.html',
  styleUrls: ['./cadastro-registro.component.css']
})
export class CadastroRegistroComponent implements OnInit{
  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private empresaService: EmpresaServiceService,
    private frotaService: FrotasServiceService,
    private registroService: RegistrosServiceService
  ){}

  registro = {titulo: '', descricao:'', registroCategoria:'', idFrota:'', idFuncionario:''}
  idEmpresa: any = ''

  listaEmpresas: any[] = []
  listaFrotas: any[] = []


  ngOnInit(): void {
      this.empresaService.findAll().subscribe(
        (response) => {
          this.listaEmpresas = response
        }
      )
      this.registro.idFuncionario = this.funcionarioService.getFuncionario().id
  }

  setFrotas(){
    if(this.idEmpresa != ''){
      this.empresaService.findAllFrotas(this.idEmpresa).subscribe(
        (response) => {
          this.listaFrotas = response
        }
      )
    }
    else{
      this.listaFrotas = []
    }
  }

  cadastrar(){
  }

  onFileSelected(event: any) {
    if(event.target.files.length > 0) 
     {
       console.log(event.target.files[0].name);
     }
   }

  btCancelar(){
    this.router.navigate(['/home'])
  }
}
