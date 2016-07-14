import{Component, OnInit, EventEmitter, Output} from '@angular/core';
import{Location} from '@angular/common';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators} from '@angular/forms';

/**
 * Custom items
 */
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';
import{ProjectService} from './project.service'
import{MetricService} from '../education/metric.service'
import{Metric} from '../education/metric.model'
import{Project} from '../education/project.model'
import{Activity} from '../education/activity.model'
import {FilterMetricsPipe} from './filter-metrics.pipe'

/**
 * Projects management
 */
@Component({
    moduleId: module.id,
    selector: 'activity-assignment',
    templateUrl: './activity-assignment.component.html',
    styleUrls: ['./activity-assignment.css'],
    directives: [
        MD_SIDENAV_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdButton,
        MdInput,
        MdHint,
        MdIcon,
        ROUTER_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES
    ],
    providers: [ProjectService, MetricService],
    pipes: [FilterMetricsPipe]
})
/**
 *
 */
export class ActivityAssignmentComponent {
    project:Project; // Project containing the activity to edit
    activityId:number; // Id of the activity to edit
    metrics:Array<Metric>; // list of metrics

    constructor(private fb:FormBuilder, private metricSvc:MetricService,private projectSvc:ProjectService, private alertMessageService:AlertMessageService, private router:Router, private activatedRoute:ActivatedRoute, private _location: Location) {
    }


    /**
     * Initialization tasks
     */
    ngOnInit() {
        // Initialize the new activities with one item such that it can be added
        /**
         * Load the parameters from the route
         */
        this.activatedRoute.params.subscribe(params => {
            this.activityId=params['id'];
            this.reloadActivity(this.activityId);
            },
            // Error reading parameters
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );

        // Load the metrics
        this.metricSvc.index().subscribe(metrics => {
                this.metrics = metrics;
            },
            // Error fetching the project
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        )

    }


    /**
     * Reloads the activity
     * @param activityId
     */
    reloadActivity(activityId:number){
        // Load the affected project
        this.projectSvc.getByActivity(activityId).subscribe(project => {
                this.project = project;
            },
            // Error fetching the project
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        )
    }

    /**
     * Assign a metric to the project
     * @param metric
     */
    assign(metric:Metric){
        this.project.metrics.push(metric);
    }
    /**
     * Remove a metric from the project
     * @param metric
     * @param idx
     */
    unAssign(metric:Metric, idx:number){
        this.project.metrics.splice(idx, 1);
    }

    /**
     * Store the metric assignments
     */
    save(){
        this.projectSvc.update(this.project).subscribe(project=> {
                this.project = project;
                this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Metric assignments have been updated'));
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Cancel assignments: reload project from database
     */
    cancel(){
        this.reloadActivity(this.project._id);
    }

    /**
     * Navigate back
     */
    goBack(){
        this._location.back();
    }

    /**
     * Get the activity object out of the containing project
     * @returns Activity
     */
    getActivity():Activity{
        if (this.project) {
            for (var i = 0; i < this.project.activities.length; i++) {
                if (this.project.activities[i]._id == this.activityId) {
                    return this.project.activities[i];
                }
            }
        }
    }

}

