import '../../lib/date-1.0.0.min.js'
declare var Date:any;

import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {School} from './school.model';
import {ConfigService} from '../config/config.service';


@Injectable()
export class SchoolService {
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService) {
        this.baseUrl = this.config.baseUrl + 'schools/'
    }


    /**
     * Get the list of schools
     */
    index():Observable<Array<School>> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Add a new school
     * @param school
     * @returns {Observable<R>}
     */
    public add(school:School) {
        return this.http.post(this.baseUrl, JSON.stringify(school))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Update a school
     * @param school
     * @returns {Observable<R>}
     */
    public update(school:School) {
        return this.http.put(this.baseUrl + school._id, JSON.stringify(school))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Delete a school
     * @param school
     * @returns {Observable<R>}
     */
    public delete(school:School) {
        return this.http.delete(this.baseUrl + school._id)
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
                    SchoolService.convertDate(item);
                });
            } else {
                SchoolService.convertDate(body);
            }
            return body;
        }
        return body || {};
    }

    /**
     * Convert the school's date properties
     * @param school
     * @returns {any}
     */
    private static convertDate(school):any{
        if (school.birthday) {
            school.birthday= Date.parse(school.birthday).toString('yyyy-MM-dd')
        }
        return school;
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