import{Component, OnInit} from '@angular/core';
import{StudentService} from './student.service'
import{Student} from './student.model'
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES,ROUTER_PROVIDERS,Routes} from '@angular/router';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from '@angular/common';


// External libraries
declare var Date: any;
/**
 * Students management
 */
@Component({
    moduleId: module.id,
    selector: 'student',
    templateUrl: './student.component.html',
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
    providers:[StudentService]
})
/**
 *
 */
export class StudentComponent {
    students:Array<Student>; // List of all students
    errorMessage:string; // Error messages occurring

    studentForm:ControlGroup; // When creating new student

    constructor(private fb:FormBuilder, private studentSvc:StudentService) {
        this.studentForm = fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", Validators.required],
            birthdate: [Date.today().toString('yyyy-MM-dd'), Validators.required]
        });
    }


    /**
     * Load the students list
     */
    ngOnInit(){
        this.studentSvc.index().subscribe(
            students => this.students=students,
            error => this.errorMessage=<any>error);
    }


    add(){
        var student = new Student(this.studentForm.value);
        this.studentSvc.add(student);
    }

}

