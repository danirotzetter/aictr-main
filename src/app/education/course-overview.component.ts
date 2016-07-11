import{Component, OnInit, EventEmitter, Output} from '@angular/core';
import{CourseService} from './course.service'
import{Course} from './course.model'
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from '@angular/common';

/**
 * Custom items
 */
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';

/**
 * Courses management
 */
@Component({
    moduleId: module.id,
    selector: 'course-overview',
    templateUrl: './course-overview.component.html',
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
        FORM_DIRECTIVES
    ],
    providers: [CourseService]
})
/**
 *
 */
export class CourseOverviewComponent {
    selectedCourse:Course; // course to edit
    courses:Array<Course>; // List of all courses

    showForm:boolean; // Whether the courses form should be displayed

    courseForm:ControlGroup; // When creating new course

    constructor(private fb:FormBuilder, private courseSvc:CourseService, private alertMessageService:AlertMessageService, public router: Router) {
    }


    /**
     * Load the courses list
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
     * Submit the course values to the database
     */
    submitForm() {
        var course = new Course(this.courseForm.value);
        // Add the selected course's id, if available
        if (this.selectedCourse._id) {
            course._id = this.selectedCourse._id;
        }
        if (course._id) {
            // Edit course
            this.courseSvc.update(course).subscribe(course=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Course has been updated'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        } else {
            // Add new course
            this.courseSvc.add(course).subscribe(course=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'New course has been added'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Add a new course
     */
    addCourse() {
        this.showForm = true;
        this.selectedCourse = new Course();
        this.updateForm(this.selectedCourse);
    }

    /**
     * Edit a course
     * @param course
     */
    editCourse(course) {
        this.showForm = true;
        this.selectedCourse = course;
        this.updateForm(this.selectedCourse);
    }

    /**
     * Delete a course
     * @param course
     */
    deleteCourse(course, index) {
        if (confirm('Delete course? This operation cannot be undone!')) {
            this.courseSvc.delete(course).subscribe(course=> {
                    this.showForm = false;
                    this.courses.splice(index, 1);// Remove from the list
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Course has been deleted'));
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
        this.courseForm = this.fb.group({
            name: [this.selectedCourse.name || '', Validators.required],
            description: [this.selectedCourse.description|| '']
        });
    }

    /**
     * Navigate to exam edit page
     * @param course
     */
    editExams(course:Course){
        this.router.navigate([''+course._id, 'exams']);
    }

}

