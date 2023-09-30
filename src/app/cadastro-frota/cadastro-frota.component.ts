import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaServiceService } from '../services/empresa-service.service';
import { FrotasServiceService } from '../services/frotas-service.service';

@Component({
  selector: 'app-cadastro-frota',
  templateUrl: './cadastro-frota.component.html',
  styleUrls: ['./cadastro-frota.component.css']
})
export class CadastroFrotaComponent implements OnInit {
  listaFrotas: any[] = []
  listaEmpresas: any[] = []

  constructor(private router: Router, private empresaSerice: EmpresaServiceService, private frotaService: FrotasServiceService){}

  frota = {nome:'', idEmpresa:0}

  ngOnInit(): void {
      this.empresaSerice.findAll().subscribe(
        (response) => {
          this.listaEmpresas = response
        }
      )
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
      if(this.frota.nome.toString().length >= 2){
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
      }
      else{
        window.alert('Preencha os campos corretamente')
      }
    }
  }
}
