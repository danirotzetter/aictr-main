import{Component, OnInit} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
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
import{Metric} from './metric.model'
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
        MD_CARD_DIRECTIVES,
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
    activities:Array<Activity> = []; // List of all activities of the currently selected project
    metrics:Array<Metric> = []; // List of all metrics of the currently selected activity
    valueForm:FormGroup; // Form of capture
    metricValues:MetricValue[]; // List of the actual values for each metric
    date:Date; // Date handling separate of the form due to angular2 and form restrictions

    constructor(private fb:FormBuilder, private valueSvc:ValueService, private schoolSvc:SchoolService, private projectSvc:ProjectService, private alertMessageService:AlertMessageService) {
    }

    /**
     * Load initial data
     */
    ngOnInit() {
        this.updateLists();
        this.resetForm();
    }

    /**
     * Clear the input form
     */
    resetForm() {
        this.valueForm = this.fb.group({
            school: ['', Validators.required],
            project: [''], // Not required - is defined through activity
            activity: ['', Validators.required]
        });

        // By default, set the current date
        this.date = new Date();
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
    }

    /**
     * Select a project for the value
     * @param projectId
     */
    selectProject(projectId) {
        // Provide the new selection for activities
        for (var i = 0; i < this.projects.length; i++) {
            if (this.projects[i]._id == projectId) {
                this.activities = this.projects[i].activities;
            }
        }
    }

    /**
     * Select an activity for the value
     * @param activityId
     */
    selectActivity(activityId) {
        // Provide the new selection for metrics
        for (var i = 0; i < this.activities.length; i++) {
            if (this.activities[i]._id == activityId) {
                this.metrics = this.activities[i].metrics;

                // Prepare the new metric values
                this.metricValues = [];
                for (var j = 0; j < this.metrics.length; j++) {
                    this.metricValues.push(
                        new MetricValue(this.metrics[j], 0)
                    );
                }
            }
        }
    }

    /**
     * Submit the value to the database
     */
    submitForm() {
        // Browse through all values and submit them individually
        for (var i = 0; i < this.metricValues.length; i++) {
            var value = new Value(this.valueForm.value);
        // Use the values stored in an 'external' (not-in-form) variable
            value._id = this.metricValues[i]._id;
            value.figure = this.metricValues[i].figure;
            value.metricId = this.metricValues[i].metric._id;
            // Use the 'external' date
            value.date = this.date;

        if (value._id) {
            // Edit value
            this.valueSvc.update(value).subscribe(value=> {
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Value has been updated'));
                    this.resetForm();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        } else {
            // Add new value
            this.valueSvc.add(value).subscribe(value=> {
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'New value has been added'));
                    this.resetForm();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
        }


    }

}


/**
 * Class containing a single value for a specific metric
 */
export class MetricValue {
    public _id:number;
    constructor(public metric:Metric, public figure:number) {
    };
}