import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoAdminComponent } from '../info-admin/info-admin.component';
import { InfoUserComponent } from '../info-user/info-user.component';
import { UserService } from '../../services/user.service';
import { UserProcesess } from '../../shared/model/user/user.procesos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  rol: string = '';
  namesUser: string = '';
  constructor(public dialog: MatDialog, private userService: UserService) {}

  openAdminDialog() {
    const dialogRef = this.dialog.open(InfoAdminComponent, {
      width: '640px',
      height: '550px',
      panelClass: 'custom-dialog-container',
      position: {
        top: '4px',
        left: '750px',
      },
      data: {
      },
    });
  }
  openUserDialog() {
    const dialogRef = this.dialog.open(InfoUserComponent, {
      width: '650px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      position: {
        top: '4px',
        left: '750px',
      },
      data: {
      },
    });
  }
  ngOnInit() {
    this.rol = localStorage.getItem('role') || '';
    const username = localStorage.getItem('username')!;
    this.userService
      .getLawyerByUsername(username)
      .subscribe((user: UserProcesess) => {
        this.namesUser = user.nombres;
      });
  }
}
