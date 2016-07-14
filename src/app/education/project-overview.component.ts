import{Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

/**
 * Custom items
 */
import{ProjectService} from './project.service'
import{Project} from './project.model'
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';

/**
 * Projects management
 */
@Component({
    moduleId: module.id,
    selector: 'project-overview',
    templateUrl: './project-overview.component.html',
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
    providers: [ProjectService]
})
/**
 *
 */
export class ProjectOverviewComponent {
    selectedProject:Project; // project to edit
    projects:Array<Project>; // List of all projects

    showForm:boolean; // Whether the projects form should be displayed

    projectForm:FormGroup; // When creating new project

    constructor(private fb:FormBuilder, private projectSvc:ProjectService, private alertMessageService:AlertMessageService, public router: Router) {
    }


    /**
     * Load the projects list
     */
    ngOnInit() {
        this.updateList();
    }

    /**
     * Refresh the list of projects
     */
    updateList() {
        this.projectSvc.index().subscribe(
            projects => {
                this.projects = projects;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Submit the project values to the database
     */
    submitForm() {
        var project = new Project(this.projectForm.value);
        // Add the selected project's id, if available
        if (this.selectedProject._id) {
            project._id = this.selectedProject._id;
        }
        if (project._id) {
            // Edit project
            this.projectSvc.update(project).subscribe(project=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Project has been updated'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        } else {
            // Add new project
            this.projectSvc.add(project).subscribe(project=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'New project has been added'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Add a new project
     */
    addProject() {
        this.showForm = true;
        this.selectedProject = new Project();
        this.updateForm(this.selectedProject);
    }

    /**
     * Edit a project
     * @param project
     */
    editProject(project) {
        this.showForm = true;
        this.selectedProject = project;
        this.updateForm(this.selectedProject);
    }

    /**
     * Delete a project
     * @param project
     */
    deleteProject(project, index) {
        if (confirm('Delete project? This operation cannot be undone!')) {
            this.projectSvc.delete(project).subscribe(project=> {
                    this.showForm = false;
                    this.projects.splice(index, 1);// Remove from the list
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Project has been deleted'));
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
        this.projectForm = this.fb.group({
            name: [this.selectedProject.name || '', Validators.required],
            description: [this.selectedProject.description|| '']
        });
    }

    /**
     * Navigate to activity edit page
     * @param project
     */
    editActivities(project:Project){
        this.router.navigate(['/projects', project._id, 'activities']);
    }
}

