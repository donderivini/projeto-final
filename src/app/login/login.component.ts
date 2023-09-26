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

  funcLogin= {login: '', senha: ''}

  funcionario: any;

  getLogin(){
    this.funcionario_service.login(this.funcLogin).subscribe(
      (response) => {
        if (response != null){
          this.funcionario_service.setFuncionario(response)
          this.route.navigate(['/home'])
        }
        else{
          this.funcionario_service.setFuncionario(null)
          window.alert('Login inexistente')
        }
      }
    )
  }

}
