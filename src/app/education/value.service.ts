import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Value} from './value.model';
import {ConfigService} from '../config/config.service';

@Injectable()
export class ValueService{
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService){
        this.baseUrl=this.config.baseUrl+'values/'
    }



    /**
     *
     * Add a new project
     * @param value
     * @returns {Observable<R>}
     */
    public add(value:Value) {
        return this.http.post(this.baseUrl, JSON.stringify(value))
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**
     *
     * Update a project
     * @param value
     * @returns {Observable<R>}
     */
    public update(value:Value) {
        return this.http.put(this.baseUrl+value._id, JSON.stringify(value))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Parse the response
     * @param res
     * @returns {any|{}}
     */
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    /**
     * Error handling
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error:any){
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }



}