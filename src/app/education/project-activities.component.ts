import{Component} from '@angular/core';
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
import {StringToDatePipe} from '../base/string-to-date.pipe';
import{ProjectService} from './project.service'
import{Project} from './project.model'
import{Activity} from './activity.model'

/**
 * Projects management
 */
@Component({
    moduleId: module.id,
    selector: 'project-activities',
    templateUrl: './project-activities.component.html',
    styleUrls: [],
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
    providers: [ProjectService],
    pipes: [StringToDatePipe]
})
/**
 *
 */
export class ProjectActivitiesComponent {
    project:Project; // project to edit
    selectedActivity:Activity; // Activity selected
    newActivity:FormGroup; // New activities to add
    showForm:boolean = false;

    constructor(private fb:FormBuilder, private projectSvc:ProjectService, private alertMessageService:AlertMessageService, private router:Router, private activatedRoute:ActivatedRoute, private _location: Location) {
    }


    /**
     * Initialization tasks
     */
    ngOnInit() {
        // Initialize the new activities with one item such that it can be added
        /**
         * Load the parameters
         */
        this.activatedRoute.params.subscribe(params => {
                // Load the affected project
                this.projectSvc.get(params['id']).subscribe(project => {
                        this.project = project;
                    },
                    // Error fetching the project
                    error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
                )
            },
            // Error reading parameters
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     */
    updateList() {
        this.projectSvc.index().subscribe(
            projects => {
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Add a new activity to the project
     */
    submitActivity() {
        /**
         * Add activity: add to the project's activity list and store it
         */
        if (this.newActivity && this.newActivity.value) {
            // Update the values of the existing activity
            if (this.newActivity.value._id) {
                for (var i = 0; i < this.project.activities.length; i++) {
                    var activity = this.project.activities[i];
                    if (activity._id == this.newActivity.value._id) {
                        activity.name = this.newActivity.value.name;
                    }
                }
            }
            else{
                // Otherwise, add a new activity to the array
                this.project.activities.push(
                    new Activity({
                        name: this.newActivity.value.name,
                    })
                );
            }
            this.projectSvc.update(this.project).subscribe(project=> {
                    this.project = project;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Project has been updated'));
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }

        this.showForm=false;
    }


    /**
     * Add a new activity
     */
    addActivity(){
        this.showForm=true;
        // Prepare form for another entry
        this.newActivity =
            this.fb.group({
                    _id: [],
                    name: ['', Validators.required],
                }
            );
    }
    
    /**
     * Edit an existing activity
     * @param activity
     */
    editActivity(activity:Activity, idx:number) {
        this.showForm=true;
        this.newActivity = this.fb.group({
                    _id: [activity._id],
                    name: [activity.name, Validators.required],
                }
            );
    }

    /**
     * Delete an activity
     * @param activity
     */
    deleteActivity(activity:Activity, idx:number) {
        // Deleting consists of removing the activity from the project and save this project
        if (confirm('Delete activity? This operation cannot be undone!')) {
            this.projectSvc.update(this.project).subscribe(project=> {
                    this.project = project;
                    this.project.activities.splice(idx, 1);
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Project has been updated'));
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Navigate back
     */
    goBack(){
        this._location.back();
    }

    /**
     * Navigate to metric assignment page
     * @param activity
     */
    assignMetrics(activity:Activity){
        this.router.navigate(['/activities', activity._id, 'metric-assignment']);
    }

}

