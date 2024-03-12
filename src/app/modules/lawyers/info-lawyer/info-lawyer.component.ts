import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { StorageService } from '../../../services/storage.service';
import { ProcesoLawyer } from '../../../shared/model/process/proceso.abogado';
import { ProcessService } from '../../../services/process.service';
import { Pageable } from '../../../shared/model/pageable';
import { ProcesoLawyerFilter } from '../../../shared/model/process/process.abogado.filter';
import { UserService } from '../../../services/user.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-info-lawyer',
  templateUrl: './info-lawyer.component.html',
  styleUrls: ['./info-lawyer.component.css'],
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
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private storageService: StorageService,
    private processService: ProcessService,
    private userService: UserService
  ) {
    this.dataSource = new MatTableDataSource<ProcesoLawyerFilter>([]);
  }

  ngOnInit() {
    const lawyer: string = localStorage.getItem('selectedLawyer')!;
    const lawyerId = parseInt(localStorage.getItem('selectedIdLawyer')!);
    console.log(this.lawyerObj);
    this.lawyerObj = JSON.parse(lawyer);
    this.obtainLawyerInfoById(lawyerId);
    this.fetchData();
    this.getImageUrlByUserId(this.lawyerObj);
  }

  fetchData() {
    const lawyerId = parseInt(localStorage.getItem('selectedIdLawyer')!);

    let params = new HttpParams()
    params = params.set('page', this.pageIndex.toString());

    params = params.set('size', this.pageSize.toString());
    params = params.set('abogadoId', lawyerId);
    this.processService
      .getProcesosByAbogadoFilter(
        params
      )
      .subscribe(
        (data: Pageable<ProcesoLawyerFilter>) => {
          this.dataSource.data = data.data;
          this.totalItems = data.totalItems;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  obtainLawyerInfoById(lawyerId: number) {
   
    this.userService
      .getAbogadoById(lawyerId)
      .subscribe((lawyer: UserProcesess) => {
        this.name = lawyer.nombres;
        this.email = lawyer.correo;
        this.numberPhone = lawyer.telefono.toString();
        console.log(lawyer.identificacion)
        this.identification = lawyer.identificacion.toString();
        this.speciality = lawyer.especialidades[0].nombre;
      });
    //this.identification = lawyerObj.identificacion.toString();
  }

  getImageUrlByUserId(lawyerObj: UserProcesess): void {
    this.storageService.descargarFoto(lawyerObj.id).subscribe((photo: Blob) => {
      console.log(this.imageUrl);
      this.imageUrl = URL.createObjectURL(photo);
    });
  }

  // Función para redirigir a otro componente al hacer clic en una fila
  redirectToOtherComponent(row: ProcesoLawyerFilter) {
    localStorage.setItem('selectedIdProcessAdmin', row.id.toString());
    this.router.navigate(['/infoprocessadmin']);
  }

  // Función para manejar el cambio de página
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }
}
