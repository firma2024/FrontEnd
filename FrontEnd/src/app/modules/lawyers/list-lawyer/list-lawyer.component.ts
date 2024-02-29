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
    // Define el filtro personalizado para la columna 'nombres'
    this.dataSource.filterPredicate = (data: UserProcesess, filter: string) => {
      return data.nombres.toLowerCase().includes(filter);
    };
  }

  ngOnInit() {
    this.userService
      .getAbogadosFilter(parseInt(localStorage.getItem('firmaId')!))
      .subscribe(
        (data: Pageable<UserProcesess>) => {
          this.dataSource.data = data.data;
          this.dataSource.paginator = this.paginator;
          console.log(data.data)
        },
        (error) => {
          console.error(error);
        }
      );
  }

  // Método para aplicar el filtro en tiempo real
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // Aplica el filtro solo a la columna 'nombres'
    this.dataSource.filter = filterValue;
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
    localStorage.setItem('selectedIdLawyer', row.id.toString());
    localStorage.setItem('selectedLawyer', JSON.stringify(row));
    this.router.navigate(['/infolawyer']);
  }
}
