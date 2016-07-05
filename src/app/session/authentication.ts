import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Http} from '@angular/http';
import {ConfigService} from '../config/config';
import {User} from '../profile/user'

@Injectable()
export class Authentication {
    token:string;
    user:User;

    constructor(private config:ConfigService, private http:Http) {
        this.token = localStorage.getItem('token');
    }

    /**
     * Login the user
     * @param username
     * @param password
     */
    login(username:String, password:String) {
        var url = this.config.baseUrl + 'users/login';
        return Observable.create(observer => {
            this.http.post(url, JSON.stringify({username: username, password: password}))
                .map(res => res.json())
                .subscribe(
                    data => {
                        // Store the token for further requests
                        this.token = data.token;
                        this.user = data.user;
                        localStorage.setItem('token', this.token);
                        observer.next(this.token);
                        observer.complete();
                    },
                    err => {
                        console.error(err);
                        // observer.error(err);
                        observer.throw(err);
                    }
                    ,
                    () => {
                        console.log('Login request complete');
                    })
        });
    }

    /**
     * Logout user
     * @returns {any}
     */
    logout() {
        // TODO send to backend
        this.token = undefined;
        localStorage.removeItem('token');
        return Observable.create((observer:Observer<any>) => {
            observer.next(true);
            observer.complete();
        });
    }

    /**
     * Check if the user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        return !!localStorage.getItem('token');
    }
}