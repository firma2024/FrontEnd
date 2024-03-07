import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterLawyerComponent } from './modules/lawyers/register-lawyer/register-lawyer.component';
import { ListLawyerComponent } from './modules/lawyers/list-lawyer/list-lawyer.component';
import { InfoLawyerComponent } from './modules/lawyers/info-lawyer/info-lawyer.component';
import { RegisterProcessComponent } from './modules/processes/register-process/register-process.component';
import { CreateProcessComponent } from './modules/processes/create-process/create-process.component';
import { InfoAdminComponent } from './home/info-admin/info-admin.component';
import { RecoverComponent } from './modules/authentication/recover/recover.component';
import { HeaderComponent } from './home/header/header.component';
import { ListProcessAdminComponent } from './modules/processes/list-process-admin/list-process-admin.component';
import { InfoProcessAdminComponent } from './modules/processes/info-process-admin/info-process-admin.component';
import { ListProcessLawyerComponent } from './modules/processes/list-process-lawyer/list-process-lawyer.component';
import { InfoProcessLawyerComponent } from './modules/processes/info-process-lawyer/info-process-lawyer.component';
import { InfoActionDocComponent } from './modules/actions/info-action-doc/info-action-doc.component';
import { InfoActionWebComponent } from './modules/actions/info-action-web/info-action-web.component';
import { InfoActionComponent } from './modules/actions/info-action/info-action.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { MainMenuLawyerComponent } from './modules/main-menu/main-menu-lawyer/main-menu-lawyer.component';
import { MainMenuAdminComponent } from './modules/main-menu/main-menu-admin/main-menu-admin.component';
import { BrokerActionComponent } from './modules/actions/broker-action/broker-action.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterLawyerComponent,
    ListLawyerComponent,
    InfoLawyerComponent,
    RegisterProcessComponent,
    CreateProcessComponent,
    InfoAdminComponent,
    RecoverComponent,
    HeaderComponent,
    ListProcessAdminComponent,
    InfoProcessAdminComponent,
    ListProcessLawyerComponent,
    InfoProcessLawyerComponent,
    InfoActionDocComponent,
    InfoActionWebComponent,
    InfoActionComponent,
    MainMenuLawyerComponent,
    MainMenuAdminComponent,
    BrokerActionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
