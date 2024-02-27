import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { StorageService } from '../../../services/storage.service';
import { ProcesoLawyer } from '../../../shared/model/process/proceso.abogado';
import { ProcessService } from '../../../services/process.service';
import { Pageable } from '../../../shared/model/pageable';
import { ProcesoLawyerFilter } from '../../../shared/model/process/process.abogado.filter';

@Component({
  selector: 'app-info-lawyer',
  templateUrl: './info-lawyer.component.html',
  styleUrl: './info-lawyer.component.css'
})
export class InfoLawyerComponent {
  name: string = '';
  email: string = '';
  numberPhone: string = '';
  identification: string = '';
  speciality: string = '';
  
  dataSource: MatTableDataSource<ProcesoLawyer>;
  columnNames: string[] = ['Radicado', 'Despacho','Tipo', 'Fecha'];
  displayedColumns: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lawyerObj!: UserProcesess;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router, private storageService:StorageService,private  processService:ProcessService) {
    this.dataSource = new MatTableDataSource<ProcesoLawyer>([]);
  }

  ngOnInit(){
    const lawyer:string = localStorage.getItem("selectedLawyer")!
    this.lawyerObj= JSON.parse(lawyer);
    this.obtainLawyerInfo(this.lawyerObj)
    this.getProcessOfLawyer(localStorage.getItem("selectedIdLawyer")!)

  }
  getProcessOfLawyer(lawyerId:string){
    console.log(lawyerId+"AAAAAAAAAAAAA")
    this.processService.getProcesosByAbogadoFilter(lawyerId).subscribe((data: Pageable<ProcesoLawyerFilter>) => {
      // Aquí puedes manejar la respuesta del servicio
      console.log(data);
    }, error => {
      // Manejo de errores
      console.error(error);
    });
  }
  obtainLawyerInfo(lawyerObj:UserProcesess){
    
    this.speciality = "SEXXXXXXXXXXXXXXXXo"
    this.name = lawyerObj.nombres
    this.email = lawyerObj.correo
    //this.numberPhone = lawyerObj.telefono.toString()
    //this.identification = lawyerObj.identificacion.toString()
  }
  ngOnDestroy(){
    localStorage.removeItem('selectedLawyer')
    localStorage.removeItem('selectedIdLawyer');
  }
  getImageUrlByUserId(lawyerObj: UserProcesess): string {
    this.storageService.descargarFoto(lawyerObj.id).subscribe(
      (photo: Blob) => {
        lawyerObj.photo = photo;
      }
    );
    if (lawyerObj.photo) {
      return URL.createObjectURL(lawyerObj.photo);
    }
    return 'assets/defaultProfile.png';
  }
  // Función para redirigir a otro componente al hacer clic en una fila
  redirectToOtherComponent(row: any) {
    // Implementa la lógica para la redirección aquí
    console.log('Redireccionando a otro componente:', row);
    //this.router.navigate(['/infolawyer']);
  }

}
