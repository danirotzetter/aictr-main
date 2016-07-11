import{Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from '@angular/common';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button';
/**
 * Custom items
 */
import{GradeService} from './grade.service';
import{CourseService} from './course.service';
import{Course} from './course.model';
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';

/**
 * Grade management
 */
@Component({
    moduleId: module.id,
    selector: 'grade',
    templateUrl: './grade.component.html',
    directives: [
        MdButton,
        MdInput,
        MdHint,
        MdIcon,
        ROUTER_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    providers:[GradeService, CourseService]
})
/**
 * Component to manage grades
 */
export class GradeComponent {
    selectedCourseIndex:number=-1; // course to edit
    courses:Array<Course>=[]; // List of all courses

    /**
     * Constructor
     * @param grades
     */
    constructor(private grades:GradeService, private courseSvc:CourseService,private fb:FormBuilder, private alertMessageService:AlertMessageService) {
        
    }

    /**
     * Initialize the component
     */
    ngOnInit() {
        this.updateList();
    }

    /**
     * Refresh the list of courses
     */
    updateList() {
        this.courseSvc.index().subscribe(
            courses => {
                this.courses = courses;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Display a specific course
     * @param idx Course index in the list
     */
    showCourse(idx:number){
        this.selectedCourseIndex = (this.selectedCourseIndex==idx? undefined:idx);
    }

}

