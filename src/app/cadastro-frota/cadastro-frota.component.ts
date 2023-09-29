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

  idFrota= 0;

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
    console.log(this.frota)
    if(this.frota.nome != ''){
    this.frotaService.create(this.frota).subscribe(
      (response) => {
        if(response != null){
          window.alert('Cadastro feito com sucesso!')
          this.setLista()
        }else{
          window.alert('Preencha o campo corretamente!')
        }
      }
    )
  }
 }
}
