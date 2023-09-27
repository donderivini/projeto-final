import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-registro',
  templateUrl: './cadastro-registro.component.html',
  styleUrls: ['./cadastro-registro.component.css']
})
export class CadastroRegistroComponent {
  constructor(private router: Router){}

  btCancelar(){
    this.router.navigate(['/home'])
  }
}
