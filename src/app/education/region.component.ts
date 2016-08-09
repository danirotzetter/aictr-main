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
import{RegionService} from './region.service'
import{Region} from './region.model'

// External libraries
declare var Date:any;
/**
 * Regions management
 */
@Component({
    moduleId: module.id,
    selector: 'region',
    templateUrl: './region.component.html',
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
    providers: [RegionService],
    pipes: [StringToDatePipe]
})
/**
 *
 */
export class RegionComponent {
    selectedRegion:Region; // region to edit
    regions:Array<Region>; // List of all regions

    showForm:boolean; // Whether the regions form should be displayed

    regionForm:FormGroup; // When creating new region

    constructor(private fb:FormBuilder, private regionSvc:RegionService, private alertMessageService:AlertMessageService) {
    }


    /**
     * Load the regions list
     */
    ngOnInit() {
        this.updateList();
    }

    /**
     * Refresh the list of regions
     */
    updateList() {
        this.regionSvc.index().subscribe(
            regions => {
                this.regions = regions;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Submit the region values to the database
     */
    submitForm() {
        var region = new Region(this.regionForm.value);
        // Add the selected region's id, if available
        if (this.selectedRegion._id) {
            region._id = this.selectedRegion._id;
        }
        if (region._id) {
            // Edit region
            this.regionSvc.update(region).subscribe(region=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Region has been updated'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        } else {
            // Add new region
            this.regionSvc.add(region).subscribe(region=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'New region has been added'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Add a new region
     */
    addRegion() {
        this.showForm = true;
        this.selectedRegion = new Region();
        this.updateForm(this.selectedRegion);
    }

    /**
     * Edit a region
     * @param region
     */
    editRegion(region) {
        this.showForm = true;
        this.selectedRegion = region;
        this.updateForm(this.selectedRegion);
    }

    /**
     * Delete a region
     * @param region
     */
    deleteRegion(region, index) {
        if (confirm('Delete region? This operation cannot be undone!')) {
            this.regionSvc.delete(region).subscribe(region=> {
                    this.showForm = false;
                    this.regions.splice(index, 1);// Remove from the list
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Region has been deleted'));
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
        this.regionForm = this.fb.group({
            name: [this.selectedRegion.name || '', Validators.required]
        });
    }

}

