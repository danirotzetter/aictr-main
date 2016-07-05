import{Component, OnInit} from '@angular/core';
import {Authentication} from '../session/authentication';
/**
 * Dealing with login/ logout/ registration functions
 */
@Component({
    moduleId: module.id,
    selector: 'logout',
    templateUrl: './logout.component.html',
    providers:[Authentication]
})
/**
 * Keep track of login data
 */
export class LogoutComponent {
    constructor(private auth:Authentication) {
    }

    /**
     * Immediately logout
     */
    ngOnInit(){
         this.auth.logout();
    }
}

