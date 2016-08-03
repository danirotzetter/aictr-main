import{Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from '@angular/common';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button';
/**
 * Custom items
 */

/**
 * Value management
 */
@Component({
    moduleId: module.id,
    selector: 'value-main',
    templateUrl: './value-main.component.html',
    directives: [
        MdButton,
        MdInput,
        MdHint,
        MdIcon,
        ROUTER_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    providers:[]
})
/**
 * Component to manage values
 */
export class ValueMainComponent {

}

