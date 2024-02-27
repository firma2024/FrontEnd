import { Component } from '@angular/core';
import { Proceso } from '../../../shared/model/process/proceso';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrl: './create-process.component.css'
})
export class CreateProcessComponent {
  nRadicado: string = 'Valor para nRadicado';
  despacho: string = 'Valor para despacho';
  typeProcess: string = 'Valor para typeProcess';
  dateFiling: string = 'Valor para dateFiling';

  listaItems: string[] = [
  ];

  opciones: { valor: string, texto: string }[] = [
    
  ];

  constructor(private userService:UserService){}
  crearProceso() {
    console.log('Se ha hecho clic en el botón "Crear Proceso"');
  }
  ngOnInit(){
    const previewProcess : Proceso = JSON.parse(localStorage.getItem("previewProcess")!);

    this.nRadicado = previewProcess.numeroRadicado
    this.despacho = previewProcess.despacho
    this.typeProcess = previewProcess.tipoProceso
    this.dateFiling = new Date(previewProcess.fechaRadicacion).toISOString().split('T')[0];
    this.listaItems = previewProcess.sujetos.split("|")


    this.userService
      .getAllAbogadosNames(parseInt(localStorage.getItem('firmaId')!))
      .subscribe(
        (lawyers: UserProcesess[]) => {
          lawyers.forEach((lawyer: UserProcesess) => {
           
              this.opciones.push({
                valor: lawyer.id.toString(),
                texto: lawyer.nombres,
              });
            
          });
        },
        (error) => {
          console.error(error);
        }
      );
  }
  ngOnDestroy(){
    localStorage.removeItem("previewProcess")
  }
}
