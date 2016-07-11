import {Component, ViewEncapsulation, OnInit, EventEmitter, Input} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AlertComponent } from 'ng2-bootstrap/components/alert';

/**
 * Import custom items
 */
import {MenuProvider} from './navigation/menu.provider';
import {ConfigService} from './config/config.service';
import {GroupPipe} from './navigation/group.pipe';
import {AlertMessage, AlertMessageType} from './base/alert-message';
import {AlertMessageService} from './base/alert-message.service';


/**
 * Define the main component
  */
@Component({
     moduleId: module.id,
    selector: 'educontrol-main-app',
    templateUrl: 'educontrol-main.component.html',
    styleUrls: ['./educontrol-main.component.css', './navigation/menu.css'],
    encapsulation: ViewEncapsulation.None, // Allow css to be applied outside template
    directives: [
        MD_SIDENAV_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdToolbar,
        MdButton,
        MdInput,
        MdIcon,
        ROUTER_DIRECTIVES,
        AlertComponent
    ],
    providers: [MdIconRegistry,
    ConfigService, // Load configuration values
        MenuProvider,
        AlertMessageService
    ],
    pipes: [GroupPipe]
})



/**
 * Bootstrap main component
 */
export class EducontrolMainAppComponent {

    menu=Array();

    private alertMessages: AlertMessage[]=[];

    /**
     * Constructor
     * @param configService Provides access to configuration values
     */
    constructor(public configService: ConfigService, private menuProvider:MenuProvider, private alertMessageService:AlertMessageService) {
        // Subscribe to new messages
        alertMessageService.alertAdded.subscribe(alertMessage => this.onAlertMessageAdded(alertMessage));
    }


    /**
     * Initialize the application
     */
    ngOnInit() {
        //Initialize the menu
        this.menu = this.menuProvider.getMenu();
    }

    /**
     * Dismiss an alert
     * @param i
     */
    public closeAlert(i:number):void {
        this.alertMessages.splice(i, 1);
    }

    /**
     * Add a new AlertMessage
     * @param alertMessage
     */
    onAlertMessageAdded(alertMessage: AlertMessage) {
        this.alertMessages.push(alertMessage);
    }
}




