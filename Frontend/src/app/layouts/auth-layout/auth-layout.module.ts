import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterUserComponent } from './../../pages/register-user/register-user.component';
import { RegisterComponent } from './../../pages/register/register.component';

@NgModule({
  imports: [
CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    FlashMessagesModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthLayoutModule { }
