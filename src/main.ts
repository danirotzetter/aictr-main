/// <reference path="../typings/main.d.ts" />
/// <reference path="../typings/index.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, provide} from '@angular/core';
import {EducontrolMainAppComponent} from './app/educontrol-main.component';
import {environment} from './app/environment';
import {HTTP_PROVIDERS, Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {ConfigService} from './app/config/config';
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    Routes
} from '@angular/router';

if (environment.production) {
    enableProdMode();
}


/**
 * Custom header configuration
 */
class DefaultRequestOptions extends RequestOptions {
    constructor() {
        super({
            method: RequestMethod.Get,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    }
}

bootstrap(EducontrolMainAppComponent, [
    ConfigService,
    HTTP_PROVIDERS,
    provide(RequestOptions, {useClass: DefaultRequestOptions}), // Custom headers for all requests. Place after HTTP_PROVIDERS
    ROUTER_PROVIDERS
]).catch(err => console.log(err));
