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
  styleUrl: './info-lawyer.component.css',
})
export class InfoLawyerComponent {
  name: string = '';
  email: string = '';
  numberPhone: string = '';
  identification: string = '';
  speciality: string = '';
  imageUrl: string = 'assets/defaultProfile.png';

  dataSource: MatTableDataSource<ProcesoLawyerFilter>;
  columnNames: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];
  displayedColumns: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lawyerObj!: UserProcesess;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private storageService: StorageService,
    private processService: ProcessService
  ) {
    this.dataSource = new MatTableDataSource<ProcesoLawyerFilter>([]);
  }

  ngOnInit() {
    const lawyer: string = localStorage.getItem('selectedLawyer')!;
    this.lawyerObj = JSON.parse(lawyer);
    this.obtainLawyerInfo(this.lawyerObj);
    this.getProcessOfLawyer(localStorage.getItem('selectedIdLawyer')!);
    this.getImageUrlByUserId(this.lawyerObj);
  }
  getProcessOfLawyer(lawyerId: string) {
    console.log(lawyerId + 'AAAAAAAAAAAAA');
    this.processService.getProcesosByAbogadoFilter(lawyerId).subscribe(
      (data: Pageable<ProcesoLawyerFilter>) => {
        this.dataSource.data = data.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obtainLawyerInfo(lawyerObj: UserProcesess) {
    this.speciality = 'SEXXXXXXXXXXXXXXXXo';
    this.name = lawyerObj.nombres;
    this.email = lawyerObj.correo;
  }
  getImageUrlByUserId(lawyerObj: UserProcesess): void {
    this.storageService.descargarFoto(lawyerObj.id).subscribe((photo: Blob) => {
      this.imageUrl = URL.createObjectURL(photo);
    });
  }

  // Función para redirigir a otro componente al hacer clic en una fila
  redirectToOtherComponent(row: ProcesoLawyerFilter) {
    localStorage.setItem('selectedIdProcessAdmin', row.id.toString());
    this.router.navigate(['/infoprocessadmin']);
  }
}
