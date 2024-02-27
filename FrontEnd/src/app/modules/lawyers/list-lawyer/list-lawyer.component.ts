import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { StorageService } from '../../../services/storage.service';
import { Pageable } from '../../../shared/model/pageable';

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
    'especialidades',
    'procesos',
    'button',
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

  ngOnInit() {
    this.userService
      .getAbogadosFilter(parseInt(localStorage.getItem('firmaId')!))
      .subscribe(
        (data: Pageable<UserProcesess>) => {
          this.dataSource.data = data.data;
          console.log(data.data);
          console.log(data.data[0].numeroProcesosAsignados);
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
  deleteUser(row: UserProcesess) {
    event!.stopPropagation();
    this.userService.deleteUser(row.id).subscribe(
      (message) => {
        alert(message);
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }
  
  redirectToOtherComponent(row: UserProcesess) {
    localStorage.setItem('selectedLawyer', JSON.stringify(row));
    this.router.navigate(['/infolawyer']);
  }
}
