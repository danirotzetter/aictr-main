import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { EducontrolMainAppComponent} from './app/educontrol-main.component';
import {  environment } from './app/environment';
import {HTTP_PROVIDERS} from '@angular/http';
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    Routes
} from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrap(EducontrolMainAppComponent, [
  HTTP_PROVIDERS,
    ROUTER_PROVIDERS
]).catch(err => console.log(err));
