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
import{DistrictService} from './district.service'
import{District} from './district.model'

// External libraries
declare var Date:any;
/**
 * Districts management
 */
@Component({
    moduleId: module.id,
    selector: 'district',
    templateUrl: './district.component.html',
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
    providers: [DistrictService],
    pipes: [StringToDatePipe]
})
/**
 *
 */
export class DistrictComponent {
    selectedDistrict:District; // district to edit
    districts:Array<District>; // List of all districts

    showForm:boolean; // Whether the districts form should be displayed

    districtForm:FormGroup; // When creating new district

    constructor(private fb:FormBuilder, private districtSvc:DistrictService, private alertMessageService:AlertMessageService) {
    }


    /**
     * Load the districts list
     */
    ngOnInit() {
        this.updateList();
    }

    /**
     * Refresh the list of districts
     */
    updateList() {
        this.districtSvc.index().subscribe(
            districts => {
                this.districts = districts;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Submit the district values to the database
     */
    submitForm() {
        var district = new District(this.districtForm.value);
        // Add the selected district's id, if available
        if (this.selectedDistrict._id) {
            district._id = this.selectedDistrict._id;
        }
        if (district._id) {
            // Edit district
            this.districtSvc.update(district).subscribe(district=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'District has been updated'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        } else {
            // Add new district
            this.districtSvc.add(district).subscribe(district=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'New district has been added'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Add a new district
     */
    addDistrict() {
        this.showForm = true;
        this.selectedDistrict = new District();
        this.updateForm(this.selectedDistrict);
    }

    /**
     * Edit a district
     * @param district
     */
    editDistrict(district) {
        this.showForm = true;
        this.selectedDistrict = district;
        this.updateForm(this.selectedDistrict);
    }

    /**
     * Delete a district
     * @param district
     */
    deleteDistrict(district, index) {
        if (confirm('Delete district? This operation cannot be undone!')) {
            this.districtSvc.delete(district).subscribe(district=> {
                    this.showForm = false;
                    this.districts.splice(index, 1);// Remove from the list
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'District has been deleted'));
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
        this.districtForm = this.fb.group({
            name: [this.selectedDistrict.name || '', Validators.required]
        });
    }

}

