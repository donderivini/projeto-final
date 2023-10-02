import { Component, OnInit } from '@angular/core';;
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmpresaServiceService } from '../services/empresa-service.service';
import { FrotasServiceService } from '../services/frotas-service.service';
import { RegistrosServiceService } from '../services/registros-service.service';
import { FuncionarioService } from '../services/funcionario-service.service';
import { ArquivosServiceService } from '../services/arquivos-service.service';

@Component({
  selector: 'app-cadastro-registro',
  templateUrl: './cadastro-registro.component.html',
  styleUrls: ['./cadastro-registro.component.css']
})
export class CadastroRegistroComponent implements OnInit{

  selectedFiles?: FileList
  currentFile?: File
  progress = 0
  message = ''

  fileInfos?: any

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private empresaService: EmpresaServiceService,
    private frotaService: FrotasServiceService,
    private registroService: RegistrosServiceService,
    private arquivoService: ArquivosServiceService
  ){}

  registro = {titulo: '', descricao:'', registroCategoria:'', idFrota:0, idFuncionario:0}
  idEmpresa= 0
  idFrota = 0
  idRegistro = 0
  categoria = ''

  listaEmpresas: any[] = []
  listaFrotas: any[] = []
  
  cadastrado = false
  cliente = true

  ngOnInit(): void {
    if(this.funcionarioService.getFuncionario() != null){
      if(this.funcionarioService.getFuncionario().empresa == null){
        this.cliente = false
        this.empresaService.findAll().subscribe(
          (response) => {
            this.listaEmpresas = response
            this.idFrota = 0
            this.registro.idFrota = this.idFrota
          }
        )
      }
      else{
        this.cliente = true
        this.idEmpresa = this.funcionarioService.getFuncionario().empresa.id
        this.setFrotas()
      }
      this.registro.idFuncionario = this.funcionarioService.getFuncionario().id
    }else{
      this.router.navigate(['/'])
    }

    console.log(this.registro.idFuncionario)
  }

  setFrotas(){
    if(this.idEmpresa != 0){
      this.empresaService.findAllFrotas(this.idEmpresa).subscribe(
        (response) => {
          this.listaFrotas = response          
        }
      )
    }
    else{
      this.listaFrotas = []
      this.idFrota = 0
      this.registro.idFrota = this.idFrota
    }
  }

  cadastrar(){
    this.registro.titulo = this.registro.titulo.trim()
    this.registro.descricao = this.registro.descricao.trim()
    this.registro.idFrota = this.idFrota
    this.registro.registroCategoria = this.categoria
    console.log(this.registro)
    if(this.registro.titulo != '' && this.registro.descricao != ''
    && this.registro.idFrota!= 0 && this.registro.idFuncionario != 0
    && this.registro.registroCategoria != ''){
      this.registroService.create(this.registro).subscribe({
        next: (data) => {
          if(data != null){
            window.alert('Registro feito com sucesso, anexe os arquivos necessários')
            this.idRegistro = data.id
            this.cadastrado = true

            console.log(this.idRegistro)
          }
          else{
            window.alert('Ocorreu um erro')
          }
        },
        error: (err) => {
          console.log('error', err)
            if(err.statusText == 'OK'){
              if(err.status == 500){
                window.alert('Número de caracteres excedido')
              }else{
                window.alert('Ocorreu um erro\n'+ err.message)
              }
              
            }else{
              window.alert('Ocorreu um erro de conexão')
            }        
        }
      })
    }
    else{
      window.alert('Preencha os campos corretamente')
    }
  }

  btCancelar(){
    this.router.navigate(['/home'])
  }



  selectFile(event: any): void {
    this.selectedFiles = event.target.files
  }

  upload(): void {
    this.progress = 0

    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0)

      if(file){
        this.currentFile = file

        this.arquivoService.upload(this.currentFile, this.idRegistro).subscribe({
          next: (event: any) => {
            if (event.tipo === HttpEventType.UploadProgress){
              this.progress = Math.round(100*event.loaded / event.total)
            }else if (event instanceof HttpResponse) {
              this.message = event.body.message
              this.registroService.getAllArquivos(this.idRegistro).subscribe(
                (response) =>{
                  this.fileInfos = response
                }
              )
            }
          }, error: (err: any) => {
            console.log(err)
            this.progress = 0

            if(err.error && err.error.message){
              this.message = err.error.message
            }else{
              this.message = 'Não foi possível carregar o arquivo!'
            }

            this.currentFile = undefined
          }
        })
      }

      this.selectedFiles = undefined
    }

  }
}
