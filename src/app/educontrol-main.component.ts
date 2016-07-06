import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES,ROUTER_PROVIDERS,Routes} from '@angular/router';

/**
 * Import custom items
 */
import {MenuProvider} from './navigation/menu.provider';
import {ConfigService} from './config/config.service';
import {GroupPipe} from './navigation/group.pipe';
/**
 * Load components
 */
import {HomeComponent} from './navigation/home.component';
import {TeacherComponent} from './person/teacher.component';
import {StudentComponent} from './person/student.component';
import {CourseComponent} from './education/course.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './profile/login.component';
import {LogoutComponent} from './profile/logout.component';



/**
 * Routing configuration
 */
@Routes([
    { path: "/home",
        component: HomeComponent },
    { path: "/teachers",
        component: TeacherComponent },
    { path: "/students",
        component: StudentComponent },
    { path: "/courses",
        component: CourseComponent },
    { path: "/profile",
        component: ProfileComponent },
    { path: "/login",
        component: LoginComponent},
    { path: "/logout",
        component: LogoutComponent}
])

/**
 * Define the main component
  */
@Component({
     moduleId: module.id,
    selector: 'educontrol-main-app',
    templateUrl: 'educontrol-main.component.html',
    styleUrls: ['educontrol-main.component.css'],
    encapsulation: ViewEncapsulation.None, // Allow css to be applied outside template
    directives: [
        MD_SIDENAV_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdToolbar,
        MdButton,
        MdInput,
        MdIcon,
        ROUTER_DIRECTIVES,
    ],
    providers: [MdIconRegistry,
    ConfigService, // Load configuration values
        MenuProvider
    ],
    pipes: [GroupPipe]
})



/**
 * Bootstrap main component
 */
export class EducontrolMainAppComponent {

    menu=Array();

    /**
     * Constructor
     * @param configService Provides access to configuration values
     */
    constructor(public configService: ConfigService, private menuProvider:MenuProvider) {}


    /**
     * Initialize the application
     */
    ngOnInit() {
        //Initialize the menu
        this.menu = this.menuProvider.getMenu();
    }
}




