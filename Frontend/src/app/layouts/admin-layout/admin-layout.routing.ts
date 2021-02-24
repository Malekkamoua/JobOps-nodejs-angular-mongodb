import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGard } from './../../guards/auth.gard';
import { SubmittedJobsComponent } from './../../pages/submitted-jobs/submitted-jobs.component';
import { AllJobsComponent } from 'src/app/pages/all-jobs/all-jobs.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,  canActivate:[AuthGard]  },
    { path: 'user-profile',   component: UserProfileComponent,  canActivate:[AuthGard]  },
    { path: 'tables',         component: TablesComponent,  canActivate:[AuthGard]  },
    { path: 'icons',          component: IconsComponent,  canActivate:[AuthGard]  },
    { path: 'maps',           component: MapsComponent,  canActivate:[AuthGard]  },
    { path: 'submitted',      component: SubmittedJobsComponent,  canActivate:[AuthGard]  },
    { path: 'jobs',            component: AllJobsComponent,  canActivate:[AuthGard]  }

  ]

