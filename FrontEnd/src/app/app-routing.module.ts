import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { MainMenuComponent } from './modules/main-menu/main-menu.component';
import { RegisterProcessComponent } from './modules/processes/register-process/register-process.component';
import { CreateProcessComponent } from './modules/processes/create-process/create-process.component';
import { InfoAdminComponent } from './home/info-admin/info-admin.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'home',component: HomeComponent},
  {path: 'main',component: MainMenuComponent},
  {path: 'registerprocess',component: RegisterProcessComponent},
  {path: 'createprocess',component:CreateProcessComponent},
  {path: 'infoadmin',component:InfoAdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
