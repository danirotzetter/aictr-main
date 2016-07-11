import{Component, OnInit, EventEmitter, Output} from '@angular/core';
import{TeacherService} from './teacher.service'
import{Teacher} from './teacher.model'
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
/**
 * Custom items
 */
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';

// External libraries
declare var Date:any;
/**
 * Teachers management
 */
@Component({
    moduleId: module.id,
    selector: 'teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./person.css'],
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
    providers: [TeacherService]
})
/**
 *
 */
export class TeacherComponent {
    selectedTeacher:Teacher; // teacher to edit
    teachers:Array<Teacher>; // List of all teachers

    showForm:boolean; // Whether the teachers form should be displayed

    teacherForm:FormGroup; // When creating new teacher

    constructor(private fb:FormBuilder, private teacherSvc:TeacherService, private alertMessageService:AlertMessageService) {
    }


    /**
     * Load the teachers list
     */
    ngOnInit() {
        this.updateList();
    }

    /**
     * Refresh the list of teachers
     */
    updateList() {
        this.teacherSvc.index().subscribe(
            teachers => {
                this.teachers = teachers;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Submit the teacher values to the database
     */
    submitForm() {
        var teacher = new Teacher(this.teacherForm.value);
        // Add the selected teacher's id, if available
        if (this.selectedTeacher._id) {
            teacher._id = this.selectedTeacher._id;
        }
        if (teacher._id) {
            // Edit teacher
            this.teacherSvc.update(teacher).subscribe(teacher=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Teacher has been updated'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        } else {
            // Add new teacher
            this.teacherSvc.add(teacher).subscribe(teacher=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'New teacher has been added'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Add a new teacher
     */
    addTeacher() {
        this.showForm = true;
        this.selectedTeacher = new Teacher();
        this.updateForm(this.selectedTeacher);
    }

    /**
     * Edit a teacher
     * @param teacher
     */
    editTeacher(teacher) {
        this.showForm = true;
        this.selectedTeacher = teacher;
        this.updateForm(this.selectedTeacher);
    }

    /**
     * Delete a teacher
     * @param teacher
     */
    deleteTeacher(teacher, index) {
        if (confirm('Delete teacher? This operation cannot be undone!')) {
            this.teacherSvc.delete(teacher).subscribe(teacher=> {
                    this.showForm = false;
                    this.teachers.splice(index, 1);// Remove from the list
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Teacher has been deleted'));
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
        this.teacherForm = this.fb.group({
            firstName: [this.selectedTeacher.firstName || '', Validators.required],
            lastName: [this.selectedTeacher.lastName || '', Validators.required],
            email: [this.selectedTeacher.email || ''],
            location: [this.selectedTeacher.location || '']
        });
    }

}

