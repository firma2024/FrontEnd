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
import { BrokerActionComponent } from './modules/actions/broker-action/broker-action.component';
import { CreateLinkAudienceComponent } from './modules/processes/create-link-audience/create-link-audience.component';
import { EditLinkAudienceComponent } from './modules/processes/edit-link-audience/edit-link-audience.component';
import { InfoUserComponent } from './home/info-user/info-user.component';


const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path: 'login',component: LoginComponent},
  {path: 'recover',component: RecoverComponent},
  {path: 'home',component: HomeComponent},
  {path: 'main',component: MainMenuAdminComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'main-lawyer',component: MainMenuLawyerComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'infoadmin',component: InfoAdminComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'infouser',component:InfoUserComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'registerlawyer',component: RegisterLawyerComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'listlawyer',component: ListLawyerComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'infolawyer',component: InfoLawyerComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'registerprocess',component: RegisterProcessComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'createprocess',component: CreateProcessComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'listprocessadmin',component: ListProcessAdminComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'infoprocessadmin',component: InfoProcessAdminComponent, canActivate:[AuthGuard], data: { roles: ['JEFE'] }},
  {path: 'listprocesslawyer',component: ListProcessLawyerComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'infoprocesslawyer',component: InfoProcessLawyerComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'header',component: HeaderComponent},
  {path: 'infoaction',component: InfoActionComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'infoactionweb',component: InfoActionWebComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'infoactiondoc',component: InfoActionDocComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'infoactionbroker',component: BrokerActionComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'createlink',component: CreateLinkAudienceComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }},
  {path: 'editlink',component: EditLinkAudienceComponent, canActivate:[AuthGuard], data: { roles: ['ABOGADO'] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
