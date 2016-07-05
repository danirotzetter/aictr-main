import{Component} from '@angular/core';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from '@angular/common';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdButton} from '@angular2-material/button/button';
import {User} from './user';
import {Http} from '@angular/http';
import {ConfigService} from '../config/config';

/**
 * Dealing with login/ logout/ registration functions
 */
@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html',
    directives: [FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton]
})
/**
 * Keep track of login data
 */
export class LoginComponent {
    loginForm:ControlGroup;
    token:String;

    constructor(fb:FormBuilder, private config:ConfigService, private http:Http) {
        this.loginForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    /**
     * Execute the login
     */
    doLogin() {
        var url = this.config.baseUrl + 'users/login';
        var content = JSON.stringify(this.loginForm.value);
        this.http.post(url, content)
            .map(res => res.json())
            .subscribe(
                data => {
                    this.token = data.token;
                },
                err => {
                    console.error(err);
                }
                ,
                () => {
                    console.log('Login request complete');
                });
    }


}

