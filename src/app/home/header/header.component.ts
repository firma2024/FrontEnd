import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoAdminComponent } from '../info-admin/info-admin.component';
import { UserService } from '../../services/user.service';
import { UserProcesess } from '../../shared/model/user/user.procesos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  namesUser: string = '';
  constructor(public dialog: MatDialog, private userService: UserService) {}

  openDialog() {
    const dialogRef = this.dialog.open(InfoAdminComponent, {
      width: '650px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      position: {
        top: '4px',
        left: '750px',
      },
      data: {
        /* Puedes pasar datos al componente del diálogo */
      },
    });
  }
  ngOnInit() {
    const username = localStorage.getItem('username')!;
    this.userService
      .getLawyerByUsername(username)
      .subscribe((user: UserProcesess) => {
        this.namesUser = user.nombres;
      });
  }
}
