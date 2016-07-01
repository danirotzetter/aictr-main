import { Component } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MenuItem} from './navigation/menu-item';
import {LoginComponent} from './profile/login.component';
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    Routes
} from '@angular/router';



/**
 * Routing configuration
 */
@Routes([
    { path: "/home",
        component: EducontrolMainAppComponent },

    { path: "/login",
        component: LoginComponent},
    { path: "/logout",
        component: LoginComponent},

    { path: "/dashboard",
        component: EducontrolMainAppComponent}
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
    providers: [MdIconRegistry]
})


/**
 * Bootstrap main component
 */
export class EducontrolMainAppComponent {
    title = 'Educontrol';


    //Initialize the menu
    menu = [new MenuItem(
        'dashboard',
        '/dashboard',
        'Dashboard',
        'Overview of all actions'
),
        new MenuItem(
            'people',
           '/professors',
           'Professors',
            'Manange professors')
        ,
        new MenuItem(
            'book',
            '/courses',
            'Courses',
            'Manange courses')
        ,
        new MenuItem(
            'account_circle',
            '/account',
            'Profile',
            'Manage Profile'
        )
        ,
        new MenuItem(
            'exit_to_app',
            '/logout',
            'Logout'
        )
    ]
}


