import{Component} from '@angular/core';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from '@angular/common';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdButton} from '@angular2-material/button/button';
import {Authentication} from '../session/authentication';
import {
        Router
} from '@angular/router';

/**
 * Dealing with login/ logout/ registration functions
 */
@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html',
    directives: [FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton],
    providers:[Authentication]
})
/**
 * Keep track of login data
 */
export class LoginComponent {
    loginForm:ControlGroup;
    token:string;
    error:boolean=false;

    constructor(fb:FormBuilder, private auth:Authentication, private router:Router) {
        this.loginForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    /**
     * Execute the login
     */
    doLogin() {
        var content = JSON.stringify(this.loginForm.value);
        this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
            (token:any)=>this.router.navigate(['/home']),
            ()=> {
                this.error = true;
            });
    }


}

