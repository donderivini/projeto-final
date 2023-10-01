import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaServiceService } from '../services/empresa-service.service';
import { FrotasServiceService } from '../services/frotas-service.service';
import { FuncionarioService } from '../services/funcionario-service.service';


@Component({
  selector: 'app-update-frota',
  templateUrl: './update-frota.component.html',
  styleUrls: ['./update-frota.component.css']
})
export class UpdateFrotaComponent  implements OnInit {
  listaFrotas: any[] = []
  listaEmpresas: any[] = []

  constructor(private router: Router, 
    private empresaSerice: EmpresaServiceService, 
    private frotaService: FrotasServiceService,
    private funcionarioService: FuncionarioService
  ){}
  
  idEmpresa=0
  idFrota=0
  frota = {nome:''}

  ngOnInit(): void {
    if(this.funcionarioService.getFuncionario() != null){
      if(this.funcionarioService.getFuncionario().cargo == 'GERENCIA'){
        this.empresaSerice.findAll().subscribe(
          (response) => {
            this.listaEmpresas = response
          }
        )
      }else{
        this.router.navigate(['/home'])
      }
    }else{
      this.router.navigate(['/'])
    }
  }

  btCancelar(){
    this.router.navigate(['/home'])
  }

  setLista(){    
    if(this.idEmpresa!=0){
      this.empresaSerice.findAllFrotas(this.idEmpresa).subscribe(
        (response) => {
          this.listaFrotas = response
          console.log(this.listaFrotas)
        }
      )
    } else{
      this.listaFrotas = []      
    }
    this.frota.nome = ''
    this.idFrota = 0
  }

  setFrota(){
    if(this.idFrota != 0){
      this.frotaService.get(this.idFrota).subscribe(
        (response) => {
          this.frota.nome = response.nome
        }
      )
    }
    else{
      this.frota.nome = ''
    }
  }

  trackBy(index: number, item: any) {
    return item.nome;
  }

  btAtualizar(){
    if(this.idEmpresa == 0 || this.idFrota == 0){
      window.alert('Selecione a frota')
    }else{
      this.frota.nome = this.frota.nome.trim() 
      console.log(this.frota)
      if(this.frota.nome != ''
      && this.idFrota != 0){
        this.frotaService.update(this.idFrota,this.frota).subscribe({
          next: (data) => {
            if (data != null){
              window.alert('Frota cadastrada com sucesso')
              this.router.navigate(['/home'])
            }
          },
          error: (err) => {
            console.log('error', err)
            if(err.statusText == 'OK'){
              window.alert('Ocorreu um erro\n'+ err.message)
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

  btDelete(){
    if(this.idEmpresa == 0 || this.idFrota == 0){
      window.alert('Selecione a frota')
    }else{
      if(window.confirm('Deletar a frota ' + this.frota.nome + '?')){
        this.frotaService.delete(this.idFrota)
        window.alert('Frota deletada')
        this.router.navigate(['/home'])
      }
    }
  }
}
