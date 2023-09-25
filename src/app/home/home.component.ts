import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../model/funcionario';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  obj: any;

  constructor(private funcionarioService: FuncionarioService){}

  ngOnInit(): void {
    // this.funcionarioService.findAll().subscribe(data => {
    //   this.obj = data
    //   console.log(data)
    // })
  }

}
