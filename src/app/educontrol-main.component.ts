import {Component} from '@angular/core';
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
import {MenuItem} from './navigation/menu-item';
import {ConfigService} from './config/config';
import {GroupPipe} from './navigation/groupPipe';
/**
 * Load components
 */
import {HomeComponent} from './navigation/home.component';
import {LoginComponent} from './profile/login.component';
import {LogoutComponent} from './profile/logout.component';



/**
 * Routing configuration
 */
@Routes([
    { path: "/home",
        component: HomeComponent },
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
    ConfigService // Load configuration values
    ],
    pipes: [GroupPipe]
})



/**
 * Bootstrap main component
 */
export class EducontrolMainAppComponent {
    title = 'Educontrol';


    /**
     * Constructor
     * @param configService Provides access to configuration values
     */
    constructor(public configService: ConfigService) {}


    //Initialize the menu
    menu = [new MenuItem(
        'home',
        '/home',
        'Home',
        'Home page'
),
        new MenuItem(
            'people',
           '/professors',
           'Professors',
            'Manange professors',
        'user')
        ,
        new MenuItem(
            'book',
            '/courses',
            'Courses',
            'Manange courses',
            'user')
        ,
        new MenuItem(
            'account_circle',
            '/account',
            'Profile',
            'Manage Profile',
            'user')
        ,
        new MenuItem(
            'vpn_key',
            '/login',
            'Login',
            undefined,
            'no-user')
        ,
        new MenuItem(
            'exit_to_app',
            '/logout',
            'Logout',
            undefined,
            'user')
    ]
}




