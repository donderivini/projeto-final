import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-frota',
  templateUrl: './cadastro-frota.component.html',
  styleUrls: ['./cadastro-frota.component.css']
})
export class CadastroFrotaComponent {
  lista: any[] = [
    {name: 'Frota 1'},
    {name: 'Frota 2'},
    {name: 'Frota 3'}
  ]

  constructor(private router: Router){}

  btCancelar(){
    this.router.navigate(['/home'])
  }

  setLista(lista: any[]) {
    this.lista = lista
  }
}
