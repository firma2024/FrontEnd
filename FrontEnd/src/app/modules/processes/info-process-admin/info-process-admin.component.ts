import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { ProcessJefeFilter } from '../../../shared/model/process/proceso.jefe.filter';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.req';
import { ActionService } from '../../../services/action.service';
import { Pageable } from '../../../shared/model/pageable';
import { ActuacionJefeFilter } from '../../../shared/model/actuaciones/actuacion.jefe.filter';
import { ProcesoStatus } from '../../../shared/model/process/proceso.estado';

@Component({
  selector: 'app-info-process-admin',
  templateUrl: './info-process-admin.component.html',
  styleUrl: './info-process-admin.component.css',
})
export class InfoProcessAdminComponent {
  nRadicado: string = 'Valor para nRadicado';

  dataSource: MatTableDataSource<ActuacionJefeFilter>;
  columnNames: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];
  displayedColumns: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];
  selectedLawyer!: string;
  selectedState!: string;
  documentImageUrl: string = 'assets/document.png';
  IdSelectedProcess!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private processService: ProcessService,
    private userService: UserService,
    private actionService: ActionService
  ) {
    this.dataSource = new MatTableDataSource<ActuacionJefeFilter>([]);
  }

  sujetosProcesales: string[] = [];

  opcionesLawyer: { valor: string; texto: string }[] = [];
  opcionesState: { valor: string; texto: string }[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.changeDetectorRefs.detectChanges();
  }

  redirectToOtherComponent(row: any) {
    console.log('Redireccionando a otro componente:', row);
    this.router.navigate(['/infoaction/:1']);
  }
  ngOnInit() {
    const idProcess = localStorage.getItem('selectedIdProcessAdmin')!;
    this.processService
      .getProcesoPorIdJefe(idProcess)
      .subscribe((process: ProcessJefeFilter) => {
        this.nRadicado = process.numeroRadicado;
        this.sujetosProcesales = process.sujetos.split('|');

        this.opcionesLawyer.push({
          valor: process.abogado,
          texto: process.abogado,
        });
        this.selectedLawyer = process.abogado;
        this.opcionesState.push({
          valor: process.estado,
          texto: process.estado,
        });
        this.selectedState = process.estado;
        this.IdSelectedProcess = process.id.toString();

        this.actionService
          .getActuacionesFilter(process.id /*Add pagination */)
          .subscribe((actions: Pageable<ActuacionJefeFilter>) => {
            console.log(actions);
            this.dataSource.data = actions.data;
          });
      });
    this.userService
      .getAllAbogadosNames(parseInt(localStorage.getItem('firmaId')!))
      .subscribe(
        (lawyers: UserProcesess[]) => {
          lawyers.forEach((lawyer: UserProcesess) => {
            if (
              !this.opcionesLawyer.some(
                (opcion) => opcion.valor === lawyer.nombres
              )
            ) {
              this.opcionesLawyer.push({
                valor: lawyer.id.toString(),
                texto: lawyer.nombres,
              });
            } else {
              this.opcionesLawyer = this.opcionesLawyer.map((opcion) =>
                opcion.valor === lawyer.nombres
                  ? { valor: lawyer.id.toString(), texto: lawyer.nombres }
                  : opcion
              );
              this.selectedLawyer  = lawyer.id.toString();
           
            }
          });
        },
        (error) => {
          console.error(error);
        }
      );
    this.processService
      .getAllEstadoProcesos()
      .subscribe((estados: ProcesoStatus[]) => {
        estados.forEach((estado: ProcesoStatus) => {
          if (
            !this.opcionesState.some((opcion) => opcion.valor === estado.nombre)
          ) {
            this.opcionesState.push({
              valor: estado.nombre,
              texto: estado.nombre,
            });
          }
        });
      });
  }
  updateProcess() {
    console.log(this.selectedLawyer);
  
    // Preguntar al usuario si desea actualizar el proceso
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar el proceso?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#AA2535',
      cancelButtonColor: '#AA2535',
      iconColor:'#AA2535'
    }).then((result) => {
      if (result.isConfirmed) {
        // Usuario confirmó la actualización, proceder
        this.processService
          .actualizarProceso(
            this.IdSelectedProcess,
            this.selectedLawyer,
            this.selectedState
          )
          .subscribe(
            (response: string) => {
              console.log(response);
              Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Proceso actualizado satisfactoriamente.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#AA2535',
                iconColor:'#AA2535'
              }).then(() => {
                location.reload();
              });
            },
            (error: any) => {
              console.error('Error al actualizar el proceso:', error);
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Error al actualizar el proceso. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#AA2535',
                iconColor:'#AA2535'
              });
            }
          );
      }
    });
  }
  
  
  
  

  ngOnDestroy() {
    //localStorage.removeItem('selectedIdProcessAdmin');
  }
}
