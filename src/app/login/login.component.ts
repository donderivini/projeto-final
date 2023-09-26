import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';
import { LoginForm } from '../model/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private route:Router, private funcionario_service: FuncionarioService){}

  funcLogin: LoginForm = new LoginForm()

  funcionario: any;

  getLogin(){
    console.log(JSON.stringify(this.funcLogin))
    this.funcionario_service.login(this.funcLogin).subscribe(
      (response) => {
        console.log('Deu certo ', response)
      }
    )
  }

}
