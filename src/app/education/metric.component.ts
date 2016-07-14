import{Component, OnInit, EventEmitter, Output} from '@angular/core';
import{MetricService} from './metric.service'
import{Metric} from './metric.model'
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

// External libraries
declare var Date:any;
/**
 * Metrics management
 */
@Component({
    moduleId: module.id,
    selector: 'metric',
    templateUrl: './metric.component.html',
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
    providers: [MetricService],
    pipes: [StringToDatePipe]
})
/**
 *
 */
export class MetricComponent {
    selectedMetric:Metric; // metric to edit
    metrics:Array<Metric>; // List of all metrics

    showForm:boolean; // Whether the metrics form should be displayed

    metricForm:FormGroup; // When creating new metric

    constructor(private fb:FormBuilder, private metricSvc:MetricService, private alertMessageService:AlertMessageService) {
    }


    /**
     * Load the metrics list
     */
    ngOnInit() {
        this.updateList();
    }

    /**
     * Refresh the list of metrics
     */
    updateList() {
        this.metricSvc.index().subscribe(
            metrics => {
                this.metrics = metrics;
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Submit the metric values to the database
     */
    submitForm() {
        var metric = new Metric(this.metricForm.value);
        // Add the selected metric's id, if available
        if (this.selectedMetric._id) {
            metric._id = this.selectedMetric._id;
        }
        if (metric._id) {
            // Edit metric
            this.metricSvc.update(metric).subscribe(metric=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Metric has been updated'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        } else {
            // Add new metric
            this.metricSvc.add(metric).subscribe(metric=> {
                    this.showForm = false;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'New metric has been added'));
                    this.updateList();
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }

    /**
     * Add a new metric
     */
    addMetric() {
        this.showForm = true;
        this.selectedMetric = new Metric();
        this.updateForm(this.selectedMetric);
    }

    /**
     * Edit a metric
     * @param metric
     */
    editMetric(metric) {
        this.showForm = true;
        this.selectedMetric = metric;
        this.updateForm(this.selectedMetric);
    }

    /**
     * Delete a metric
     * @param metric
     */
    deleteMetric(metric, index) {
        if (confirm('Delete metric? This operation cannot be undone!')) {
            this.metricSvc.delete(metric).subscribe(metric=> {
                    this.showForm = false;
                    this.metrics.splice(index, 1);// Remove from the list
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Metric has been deleted'));
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
        this.metricForm = this.fb.group({
            name: [this.selectedMetric.name || '', Validators.required]
        });
    }

}

