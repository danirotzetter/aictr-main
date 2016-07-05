/// <reference path="../typings/main.d.ts" />
/// <reference path="../typings/index.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, provide} from '@angular/core';
import {environment} from './app/environment';
import {HTTP_PROVIDERS, Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {ROUTER_DIRECTIVES,ROUTER_PROVIDERS,Routes} from '@angular/router';

/**
 * Custom imports
 */
import {EducontrolMainAppComponent} from './app/educontrol-main.component';
import {ConfigService} from './app/config/config';
import {Authentication} from './app/session/authentication';

if (environment.production) {
    enableProdMode();
}


/**
 * Custom header configuration
 */
class DefaultRequestOptions extends RequestOptions {
    // Always request JSON
    constructor() {
        super({
            method: RequestMethod.Get,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
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
    ROUTER_PROVIDERS,
    Authentication
]).catch(err => console.log(err));
