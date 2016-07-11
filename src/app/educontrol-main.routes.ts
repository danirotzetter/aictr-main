import { provideRouter, RouterConfig } from '@angular/router'

/**
 * Load components
 */
import {HomeComponent} from './navigation/home.component';
import {TeacherComponent} from './person/teacher.component';
import {StudentComponent} from './person/student.component';
import {CourseMainComponent} from './education/course-main.component';
import {CourseOverviewComponent} from './education/course-overview.component';
import {GradeComponent} from './education/grade.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './profile/login.component';
import {LogoutComponent} from './profile/logout.component';



/**
 * Routing configuration
 */
export const routes: RouterConfig=[
    { path: "home",
        component: HomeComponent },
    { path: "teachers",
        component: TeacherComponent },
    { path: "students",
        component: StudentComponent },
    { path: "courses",
        component: CourseMainComponent,
        children: [
            { path: '', component: CourseOverviewComponent},
            { path: ':id/exams', component: CourseOverviewComponent }
        ]},
    { path: "grades",
        component: GradeComponent },
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