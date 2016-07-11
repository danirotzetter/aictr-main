/// <reference path="../typings/main.d.ts" />
/// <reference path="../typings/index.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, provide, Injectable} from '@angular/core';
import {environment} from './app/environment';
import {HTTP_PROVIDERS, Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';


/**
 * Custom imports
 */
import {EducontrolMainAppComponent} from './app/educontrol-main.component';
import {ConfigService} from './app/config/config.service';
import {AuthenticationService} from './app/session/authentication.service';
import {APP_ROUTER_PROVIDERS} from "./app/educontrol-main.routes"

if (environment.production) {
    enableProdMode();
}


/**
 * Custom header configuration
 */
class DefaultRequestOptions extends RequestOptions {
public token:string;

    constructor() {

    // Always request JSON
        var headers= new Headers({
            'Content-Type': 'application/json'
        });
        // Append the token to the header, if logged in
        var token = localStorage.getItem('token');
        if (token){
            // Can append the token to the header
            headers.append('x-access-token', token);
        }

        super({
            method: RequestMethod.Get,
            headers: headers
        });
    }
}

/**
 * Initialize the application
 */
bootstrap(EducontrolMainAppComponent, [
    ConfigService,
    HTTP_PROVIDERS,
    provide(RequestOptions, {useClass: DefaultRequestOptions}), // Custom headers for all requests. Place after HTTP_PROVIDERS
    APP_ROUTER_PROVIDERS,
    AuthenticationService,
    disableDeprecatedForms(),
    provideForms()
]).catch(err => console.log(err));
