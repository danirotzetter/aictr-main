import '../../lib/date-1.0.0.min.js'
declare var Date:any;

import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Metric} from './metric.model';
import {ConfigService} from '../config/config.service';

@Injectable()
export class MetricService {
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService) {
        this.baseUrl = this.config.baseUrl + 'metrics/'
    }


    /**
     * Get the list of metrics
     */
    index():Observable<Array<Metric>> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Add a new metric
     * @param metric
     * @returns {Observable<R>}
     */
    public add(metric:Metric) {
        return this.http.post(this.baseUrl, JSON.stringify(metric))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Update a metric
     * @param metric
     * @returns {Observable<R>}
     */
    public update(metric:Metric) {
        return this.http.put(this.baseUrl + metric._id, JSON.stringify(metric))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Delete a metric
     * @param metric
     * @returns {Observable<R>}
     */
    public delete(metric:Metric) {
        return this.http.delete(this.baseUrl + metric._id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Parse the response
     * @param res
     * @returns {any|{}}
     */
    private extractData(res:Response) {

        let body = res.json();
        if (body) {
            if (body instanceof Array) {
                body.forEach(function (item) {
                    MetricService.convertDate(item);
                });
            } else {
                MetricService.convertDate(body);
            }
            return body;
        }
        return body || {};
    }

    /**
     * Convert the metric's date properties
     * @param metric
     * @returns {any}
     */
    private static convertDate(metric):any{
        if (metric.birthday) {
            metric.birthday= Date.parse(metric.birthday).toString('yyyy-MM-dd')
        }
        return metric;
    }

    /**
     * Error handling
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}