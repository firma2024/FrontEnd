import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { RegisterProcessComponent } from './modules/processes/register-process/register-process.component';
import { CreateProcessComponent } from './modules/processes/create-process/create-process.component';
import { InfoAdminComponent } from './home/info-admin/info-admin.component';
import { RecoverComponent } from './modules/authentication/recover/recover.component';
import { RegisterLawyerComponent } from './modules/lawyers/register-lawyer/register-lawyer.component';
import { HeaderComponent } from './home/header/header.component';
import { InfoActionComponent } from './modules/actions/info-action/info-action.component';
import { InfoActionWebComponent } from './modules/actions/info-action-web/info-action-web.component';
import { InfoActionDocComponent } from './modules/actions/info-action-doc/info-action-doc.component';
import { ListLawyerComponent } from './modules/lawyers/list-lawyer/list-lawyer.component';
import { InfoLawyerComponent } from './modules/lawyers/info-lawyer/info-lawyer.component';
import { ListProcessAdminComponent } from './modules/processes/list-process-admin/list-process-admin.component';
import { ListProcessLawyerComponent } from './modules/processes/list-process-lawyer/list-process-lawyer.component';
import { InfoProcessAdminComponent } from './modules/processes/info-process-admin/info-process-admin.component';
import { InfoProcessLawyerComponent } from './modules/processes/info-process-lawyer/info-process-lawyer.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { MainMenuAdminComponent } from './modules/main-menu/main-menu-admin/main-menu-admin.component';
import { MainMenuLawyerComponent } from './modules/main-menu/main-menu-lawyer/main-menu-lawyer.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path: 'login',component: LoginComponent},
  {path: 'recover',component: RecoverComponent},
  {path: 'home',component: HomeComponent},
  {path: 'main',component: MainMenuAdminComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'main-lawyer',component: MainMenuLawyerComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'infoadmin',component: InfoAdminComponent},
  {path: 'registerlawyer',component: RegisterLawyerComponent},
  {path: 'listlawyer',component: ListLawyerComponent},
  {path: 'infolawyer',component: InfoLawyerComponent},
  {path: 'registerprocess',component: RegisterProcessComponent},
  {path: 'createprocess',component: CreateProcessComponent},
  {path: 'listprocessadmin',component: ListProcessAdminComponent},
  {path: 'infoprocessadmin',component: InfoProcessAdminComponent},
  {path: 'listprocesslawyer',component: ListProcessLawyerComponent},
  {path: 'infoprocesslawyer',component: InfoProcessLawyerComponent},
  {path: 'header',component: HeaderComponent},
  {path: 'infoaction/:id',component: InfoActionComponent},
  {path: 'infoactionweb/:id',component: InfoActionWebComponent},
  {path: 'infoactiondoc/:id',component: InfoActionDocComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }