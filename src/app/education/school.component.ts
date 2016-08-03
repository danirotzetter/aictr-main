import{Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES,FormGroup, FormBuilder, Validators} from '@angular/forms';

/**
 * Custom items
 */
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';
import {StringToDatePipe} from '../base/string-to-date.pipe';
import{SchoolService} from './school.service'
import{School} from './school.model'

// External libraries
declare var Date:any;
/**
 * Schools management
 */
@Component({
    moduleId: module.id,
    selector: 'school',
    templateUrl: './school.component.html',
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
    providers: [SchoolService],
    pipes: [StringToDatePipe]
})
/**
 *
 */
export class SchoolComponent {
    selectedSchool:School; // school to edit
    schools:Array<School>; // List of all schools

    showForm:boolean; // Whether the schools form should be displayed

    schoolForm:FormGroup; // When creating new school

    constructor(private fb:FormBuilder, private schoolSvc:SchoolService, private alertMessageService:AlertMessageService) {
    }


    /**
     * Load the schools list
     */
    ngOnInit() {
        this.updateList();
    }

    /**
     * Refresh the list of schools
     */
    updateList() {
        this.schoolSvc.index().subscribe(
            schools => {
                this.schools = schools;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Submit the school values to the database
     */
    submitForm() {
        var school = new School(this.schoolForm.value);
        // Add the selected school's id, if available
        if (this.selectedSchool._id) {
            school._id = this.selectedSchool._id;
        }
        if (school._id) {
            // Edit school
            this.schoolSvc.update(school).subscribe(school=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'School has been updated'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        } else {
            // Add new school
            this.schoolSvc.add(school).subscribe(school=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'New school has been added'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Add a new school
     */
    addSchool() {
        this.showForm = true;
        this.selectedSchool = new School();
        this.updateForm(this.selectedSchool);
    }

    /**
     * Edit a school
     * @param school
     */
    editSchool(school) {
        this.showForm = true;
        this.selectedSchool = school;
        this.updateForm(this.selectedSchool);
    }

    /**
     * Delete a school
     * @param school
     */
    deleteSchool(school, index) {
        if (confirm('Delete school? This operation cannot be undone!')) {
            this.schoolSvc.delete(school).subscribe(school=> {
                    this.showForm = false;
                    this.schools.splice(index, 1);// Remove from the list
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'School has been deleted'));
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Update the form values
     * @param values
     */
    updateForm(values:Object = {}) {
        this.schoolForm = this.fb.group({
            name: [this.selectedSchool.name || '', Validators.required]
        });
    }

}

