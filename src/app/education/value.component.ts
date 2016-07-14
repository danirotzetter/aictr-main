import{Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from '@angular/common';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button';
/**
 * Custom items
 */
import{ValueService} from './value.service';
import{ProjectService} from './project.service';
import{Project} from './project.model';
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';

/**
 * Value management
 */
@Component({
    moduleId: module.id,
    selector: 'value',
    templateUrl: './value.component.html',
    directives: [
        MdButton,
        MdInput,
        MdHint,
        MdIcon,
        ROUTER_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    providers:[ValueService, ProjectService]
})
/**
 * Component to manage values
 */
export class ValueComponent {
    selectedProjectIndex:number=-1; // project to edit
    projects:Array<Project>=[]; // List of all projects

    /**
     * Constructor
     * @param values
     */
    constructor(private values:ValueService, private projectSvc:ProjectService,private fb:FormBuilder, private alertMessageService:AlertMessageService) {
        
    }

    /**
     * Initialize the component
     */
    ngOnInit() {
        this.updateList();
    }

    /**
     * Refresh the list of projects
     */
    updateList() {
        this.projectSvc.index().subscribe(
            projects => {
                this.projects = projects;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Display a specific project
     * @param idx Project index in the list
     */
    showProject(idx:number){
        this.selectedProjectIndex = (this.selectedProjectIndex==idx? undefined:idx);
    }

}

