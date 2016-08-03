import{Component, OnInit} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
/**
 * Custom items
 */
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';
import{SchoolService} from './school.service'
import{School} from './school.model'
import{ProjectService} from './project.service'
import{Project} from './project.model'
import{Activity} from './activity.model'
import {Value} from "./value.model";
import{ValueService} from './value.service'
import {StringToDatePipe} from '../base/string-to-date.pipe';
/**
 * Value management
 */
@Component({
    moduleId: module.id,
    selector: 'value-capture',
    templateUrl: './value-capture.component.html',
    directives: [
        MdButton,
        MdInput,
        MdHint,
        MdIcon,
        ROUTER_DIRECTIVES,
        DATEPICKER_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES
    ],
    providers: [ValueService, SchoolService, ProjectService],
    pipes: [StringToDatePipe]
})
/**
 * Component to capture values
 */
export class ValueCaptureComponent {
    schools:Array<School>; // List of all schools
    projects:Array<Project>; // List of all projects
    value:Value; // The value being captured

    constructor(private fb:FormBuilder, private valueSvc:ValueService, private schoolSvc:SchoolService, private projectSvc:ProjectService, private alertMessageService:AlertMessageService) {
    }

    /**
     * Load initial data
     */
    ngOnInit() {
        this.updateLists();
        this.value = new Value({
            date: new Date()
        });
    }

    /**
     * Refresh the list for the dropdown menus
     */
    updateLists() {
        // Schools
        this.schoolSvc.index().subscribe(
            schools => {
                this.schools = schools;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
        // Projects
        this.projectSvc.index().subscribe(
            projects => {
                this.projects = projects;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }


    /**
     * Select a school for the value
     * @param schoolId
     */
    selectSchool(schoolId) {
        for (var i = 0; i < this.schools.length; i++) {
            if (this.schools[i]._id == schoolId) {
                this.value.school = this.schools[i];
            }
        }
    }

    /**
     * Select a project for the value
     * @param projectId
     */
    selectProject(projectId) {
        for (var i = 0; i < this.projects.length; i++) {
            if (this.projects[i]._id == projectId) {
                this.value.project= this.projects[i];
            }
        }
    }

    /**
     * Select an activity for the value
     * @param activityId
     */
    selectActivity(activityId) {
        for (var i = 0; i < this.value.project.activities.length; i++) {
            if (this.value.project.activities[i]._id == activityId) {
                this.value.activity = this.value.project.activities[i];
            }
        }
    }

}

