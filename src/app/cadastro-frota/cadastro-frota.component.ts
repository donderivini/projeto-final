import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaServiceService } from '../services/empresa-service.service';
import { FrotasServiceService } from '../services/frotas-service.service';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-cadastro-frota',
  templateUrl: './cadastro-frota.component.html',
  styleUrls: ['./cadastro-frota.component.css']
})
export class CadastroFrotaComponent implements OnInit {
  listaFrotas: any[] = []
  listaEmpresas: any[] = []

  constructor(private router: Router, 
    private empresaSerice: EmpresaServiceService, 
    private frotaService: FrotasServiceService,
    private funcionarioService: FuncionarioService){}

  frota = {nome:'', idEmpresa:0}

  ngOnInit(): void {
    if(this.funcionarioService.getFuncionario() != null){
      this.empresaSerice.findAll().subscribe(
        (response) => {
          this.listaEmpresas = response
        }
      )
    }else{
      this.router.navigate(['/'])
    }
  }

  btCancelar(){
    this.router.navigate(['/home'])
  }

  setLista(){    
    if(this.frota.idEmpresa!=0){
      this.empresaSerice.findAllFrotas(this.frota.idEmpresa).subscribe(
        (response) => {
          this.listaFrotas = response
          console.log(this.listaFrotas)
        }
      )
    } else{this.listaFrotas = []}
  }

  trackBy(index: number, item: any) {
    return item.nome;
  }

  cadastrar(){
    this.frota.nome = this.frota.nome.trim() 
    console.log(this.frota)
    if(this.frota.nome != ''
    && this.frota.idEmpresa != 0){
      this.frotaService.create(this.frota).subscribe({
        next: (data) => {
          if (data != null){
            window.alert('Frota cadastrada com sucesso')
            this.router.navigate(['/home'])
          }
        },
        error: (err) => {
          console.log('error', err)
          if(err.statusText == 'OK'){
            if(err.status == 500){
              window.alert('Frota já cadastrada')
            }
            else{
              window.alert('Ocorreu um erro\n'+ err.message)
            }
          }else{
            window.alert('Ocorreu um erro de conexão')
          }        
        },
        complete: () => console.log("Completo")
      })
    }else{
      window.alert('Preencha os campos corretamente')
    }
  }
}
