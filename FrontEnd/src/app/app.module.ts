import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { ListProcessComponent } from './modules/processes/list-process/list-process.component';

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
    ListProcessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
