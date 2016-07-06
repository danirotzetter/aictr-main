import{Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../session/authentication.service';
/**
 * Manage profile
 */
@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: './profile.component.html',
    providers:[AuthenticationService]
})
/**
 */
export class ProfileComponent {
    constructor(private auth:AuthenticationService) {
    }
}

