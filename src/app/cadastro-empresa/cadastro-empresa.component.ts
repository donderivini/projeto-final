import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EmpresaServiceService } from '../services/empresa-service.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit{

  constructor(private router:Router, private empresa_service: EmpresaServiceService){}

  empresaCadastro= {nome: '', cnpj: '', endereco: '', cidade: '', estado: 'Escolher...'}

  empresa: any;

  estados: any[] = []

  ngOnInit(): void {
      this.empresa_service.findAllEstado().subscribe(
        (response) => {
          this.estados = response
        }
      )
  }

  setCadastro(){
    console.log(this.empresaCadastro)
    console.log(JSON.stringify(this.empresaCadastro))
    this.empresa_service.create(this.empresaCadastro).subscribe(
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
