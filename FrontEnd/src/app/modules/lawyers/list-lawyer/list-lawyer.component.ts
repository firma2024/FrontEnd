import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-list-lawyer',
  templateUrl: './list-lawyer.component.html',
  styleUrls: ['./list-lawyer.component.css'],
})
export class ListLawyerComponent {
  dataSource: MatTableDataSource<UserProcesess>;
  columnNames: string[] = [
    'nombres',
    'correo',
    'telefono',
    'identificacion',
    'especialidades',
    'procesos',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.dataSource = new MatTableDataSource<UserProcesess>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    //this.changeDetectorRefs.detectChanges();
  }

  ngOnInit() {
    const firmaId = localStorage.getItem('firmaId')!;
    this.userService.getAllAbogadosNames(parseInt(firmaId)).subscribe(
      (lawyers: UserProcesess[]) => {
        this.dataSource.data = lawyers;
        console.log(lawyers);
        this.dataSource.data.forEach((item) => {
          this.storageService
            .descargarFoto(item.id)
            .subscribe((photo: Blob) => {
              item.photo = photo;
            });
        });

        /*const userProcesess: UserProcesess = {
          id: 1,
          nombres: "Usuario de prueba",
          correo: "correo@example.com",
          telefono: 1234567890,
          identificacion: 123456789,
          especialidades: ["especialidad1", "especialidad2"],
          procesos: 5,
          photo:null!
      };
      this.dataSource.data.push(userProcesess)*/
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getImageUrl(userProcesess: UserProcesess): string {
    if (userProcesess && userProcesess.photo) {
      return URL.createObjectURL(userProcesess.photo);
    }
    return 'assets/defaultProfile.png';
  }

  redirectToOtherComponent(row: any) {
    console.log('Redireccionando a otro componente:', row);
    localStorage.setItem('selectedLawyer', JSON.stringify(row));

    this.router.navigate(['/infolawyer']);
  }
}
