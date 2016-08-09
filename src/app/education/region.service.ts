import '../../lib/date-1.0.0.min.js'
declare var Date:any;

import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Region} from './region.model';
import {ConfigService} from '../config/config.service';


@Injectable()
export class RegionService {
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService) {
        this.baseUrl = this.config.baseUrl + 'regions/'
    }


    /**
     * Get the list of regions
     */
    index():Observable<Array<Region>> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Add a new region
     * @param region
     * @returns {Observable<R>}
     */
    public add(region:Region) {
        return this.http.post(this.baseUrl, JSON.stringify(region))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Update a region
     * @param region
     * @returns {Observable<R>}
     */
    public update(region:Region) {
        return this.http.put(this.baseUrl + region._id, JSON.stringify(region))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Delete a region
     * @param region
     * @returns {Observable<R>}
     */
    public delete(region:Region) {
        return this.http.delete(this.baseUrl + region._id)
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
                    RegionService.convertDate(item);
                });
            } else {
                RegionService.convertDate(body);
            }
            return body;
        }
        return body || {};
    }

    /**
     * Convert the region's date properties
     * @param region
     * @returns {any}
     */
    private static convertDate(region):any{
        if (region.birthday) {
            region.birthday= Date.parse(region.birthday).toString('yyyy-MM-dd')
        }
        return region;
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