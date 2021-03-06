import{Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../session/authentication.service';
/**
 * Dealing with login/ logout/ registration functions
 */
@Component({
    moduleId: module.id,
    selector: 'logout',
    templateUrl: './logout.component.html',
    providers:[AuthenticationService]
})
/**
 * Keep track of login data
 */
export class LogoutComponent {
    constructor(private auth:AuthenticationService) {
    }

    /**
     * Immediately logout
     */
    ngOnInit(){
         this.auth.logout();
    }
}

