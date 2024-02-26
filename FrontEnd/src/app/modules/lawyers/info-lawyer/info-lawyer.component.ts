import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { StorageService } from '../../../services/storage.service';
import { ProcesoLawyer } from '../../../shared/model/process/proceso.abogado';
import { ProcessService } from '../../../services/process.service';

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    //this.changeDetectorRefs.detectChanges();
  }
  ngOnInit(){
    const lawyer:string = localStorage.getItem("selectedLawyer")!
    this.lawyerObj = JSON.parse(lawyer);
    this.name = this.lawyerObj.nombres
    this.email = this.lawyerObj.correo
    this.numberPhone = this.lawyerObj.correo,
    this.identification = this.lawyerObj.identificacion.toString()
    this.speciality = this.lawyerObj.especialidades.toString()
    
    const lawyerId = this.lawyerObj.id
    this.processService.getProcesoPorIdAbogado(lawyerId).subscribe((procesoLawyer:ProcesoLawyer) => {
      this.dataSource.data = [procesoLawyer];
    });

  }
  ngOnDestroy(){
    localStorage.removeItem('selectedLawyer')
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
    this.router.navigate(['/infolawyer']);
  }

}
