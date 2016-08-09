import '../../lib/date-1.0.0.min.js'
declare var Date:any;

import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {District} from './district.model';
import {ConfigService} from '../config/config.service';


@Injectable()
export class DistrictService {
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService) {
        this.baseUrl = this.config.baseUrl + 'districts/'
    }


    /**
     * Get the list of districts
     */
    index():Observable<Array<District>> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Add a new district
     * @param district
     * @returns {Observable<R>}
     */
    public add(district:District) {
        return this.http.post(this.baseUrl, JSON.stringify(district))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Update a district
     * @param district
     * @returns {Observable<R>}
     */
    public update(district:District) {
        return this.http.put(this.baseUrl + district._id, JSON.stringify(district))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Delete a district
     * @param district
     * @returns {Observable<R>}
     */
    public delete(district:District) {
        return this.http.delete(this.baseUrl + district._id)
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
                    DistrictService.convertDate(item);
                });
            } else {
                DistrictService.convertDate(body);
            }
            return body;
        }
        return body || {};
    }

    /**
     * Convert the district's date properties
     * @param district
     * @returns {any}
     */
    private static convertDate(district):any{
        if (district.birthday) {
            district.birthday= Date.parse(district.birthday).toString('yyyy-MM-dd')
        }
        return district;
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