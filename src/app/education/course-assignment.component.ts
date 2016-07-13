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
import{CourseService} from './course.service'
import{StudentService} from '../person/student.service'
import{Course} from './course.model'
import{Student} from '../person/student.model'
import {FilterStudentsPipe} from './filter-students.pipe'

/**
 * Courses management
 */
@Component({
    moduleId: module.id,
    selector: 'course-assignment',
    templateUrl: './course-assignment.component.html',
    styleUrls: ['./course-assignment.css'],
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
    providers: [CourseService, StudentService],
    pipes: [FilterStudentsPipe]
})
/**
 *
 */
export class CourseAssignmentComponent {
    course:Course; // course to edit
    students:Array<Student>; // list of students

    constructor(private fb:FormBuilder, private studentSvc:StudentService,private courseSvc:CourseService, private alertMessageService:AlertMessageService, private router:Router, private activatedRoute:ActivatedRoute, private _location: Location) {
    }


    /**
     * Initialization tasks
     */
    ngOnInit() {
        // Initialize the new exams with one item such that it can be added
        /**
         * Load the parameters from the route
         */
        this.activatedRoute.params.subscribe(params => {
            var courseId=params['id'];
            this.reloadCourse(courseId);
            },
            // Error reading parameters
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );

        // Load the students
        this.studentSvc.index().subscribe(students => {
                this.students = students;
            },
            // Error fetching the course
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        )

    }


    /**
     * Reloads the course
     * @param courseId
     */
    reloadCourse(courseId:number){
        // Load the affected course
        this.courseSvc.get(courseId).subscribe(course => {
                this.course = course;
            },
            // Error fetching the course
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        )
    }

    /**
     * Assign a student to the course
     * @param student
     */
    assign(student:Student){
        this.course.students.push(student);
    }
    /**
     * Remove a student from the course
     * @param student
     * @param idx
     */
    unAssign(student:Student, idx:number){
        this.course.students.splice(idx, 1);
    }

    /**
     * Store the student assignments
     */
    save(){
        this.courseSvc.update(this.course).subscribe(course=> {
                this.course = course;
                this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Student assignments have been updated'));
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Cancel assignments: reload course from database
     */
    cancel(){
        this.reloadCourse(this.course._id);
    }

    /**
     * Navigate to course overview
     */
    goBack(){
        this._location.back();
    }


}

