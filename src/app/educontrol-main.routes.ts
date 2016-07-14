import { provideRouter, RouterConfig } from '@angular/router'

/**
 * Load components
 */
import {HomeComponent} from './navigation/home.component';
import {MetricComponent} from './education/metric.component';
import {SchoolComponent} from './education/school.component';
import {ProjectMainComponent} from './education/project-main.component';
import {ProjectOverviewComponent} from './education/project-overview.component';
import {ProjectActivitysComponent} from './education/project-activities.component';
import {ProjectAssignmentComponent} from './education/project-assignment.component';
import {ValueComponent} from './education/value.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './profile/login.component';
import {LogoutComponent} from './profile/logout.component';



/**
 * Routing configuration
 */
export const routes: RouterConfig=[
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: "home",
        component: HomeComponent },
    { path: "metrics",
        component: MetricComponent },
    { path: "schools",
        component: SchoolComponent },
    { path: "projects",
        component: ProjectMainComponent,
        children: [
            { path: '', component: ProjectOverviewComponent},
            { path: ':id/activities', component: ProjectActivitysComponent },
            { path: ':id/metric-assignment', component: ProjectAssignmentComponent }
        ]},
    { path: "values",
        component: ValueComponent },
    { path: "profile",
        component: ProfileComponent },
    { path: "login",
        component: LoginComponent},
    { path: "logout",
        component: LogoutComponent}
]
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];