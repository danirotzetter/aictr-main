import{Component} from '@angular/core';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdButton} from '@angular2-material/button/button';
import {User} from './user';


/**
 * Dealing with login/ logout/ registration functions
 */
@Component({
    moduleId: module.id,
    selector:'login',
    templateUrl:'./login.component.html',
    directives:[FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton]
})
export class LoginComponent{
    loginForm:ControlGroup;

    constructor(fb: FormBuilder) {
        this.loginForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    /**
     * Execute the login
     */
    doLogin() {
    }
}

