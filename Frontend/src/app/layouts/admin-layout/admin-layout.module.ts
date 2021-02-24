import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { SubmittedJobsComponent } from './../../pages/submitted-jobs/submitted-jobs.component';
import { AllJobsComponent } from './../../pages/all-jobs/all-jobs.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AvatarModule, AvatarSource } from 'ngx-avatar';
import { AngularFileUploaderModule } from "angular-file-uploader";

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];

@NgModule({
  imports: [
CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FlashMessagesModule,
    AvatarModule.forRoot({
      sourcePriorityOrder: avatarSourcesOrder
    }),
    PdfViewerModule,
    AngularFileUploaderModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    SubmittedJobsComponent,
    AllJobsComponent
  ]
})

export class AdminLayoutModule {}
