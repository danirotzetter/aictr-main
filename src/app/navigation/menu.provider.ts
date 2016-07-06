import {Injectable} from '@angular/core';
import {MenuItem} from './menu-item';

/**
 * Provide menu functions
 */
@Injectable()
export class MenuProvider {

    /**
     * Array of menu items
     * @type {Array}
     */
    private menu:Array<MenuItem>;

    constructor() {
    /**
     * Set up the menu
     */
    this.menu = [new MenuItem(
        'home',
        '/home',
        'Home',
        'Home page'
    ),
        new MenuItem(
            'people',
            '/teachers',
            'Teachers',
            'Manage teachers',
            'user')
        ,
        new MenuItem(
            'book',
            '/courses',
            'Courses',
            'Manage courses',
            'user')
        ,
        new MenuItem(
            'local_library',
            '/students',
            'Students',
            'Manage students',
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




    /**
     * Get the menu
     * @returns {Array}
     */
    getMenu():Array<MenuItem> {
        return this.menu;
    }
}