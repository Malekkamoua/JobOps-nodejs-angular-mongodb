import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ApiService } from './services/api.service';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ValidateService } from './services/validate.service';
import { AuthGard } from './guards/auth.gard';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { AvatarModule, AvatarSource } from 'ngx-avatar';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularFileUploaderModule } from "angular-file-uploader";

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'white',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 40,
  fgsType: SPINNER.wanderingCubes,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}

@NgModule({
  imports: [
  BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    AvatarModule.forRoot({
      sourcePriorityOrder: avatarSourcesOrder
    }),
    PdfViewerModule,
    AngularFileUploaderModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    RegisterUserComponent
  ],
  providers: [ValidateService, ApiService, AuthGard],
  bootstrap: [AppComponent]
})
export class AppModule { }
