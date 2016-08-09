import '../../lib/date-1.0.0.min.js'
declare var Date:any;

import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {User} from './user.model';
import {ConfigService} from '../config/config.service';


@Injectable()
export class UserService {
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService) {
        this.baseUrl = this.config.baseUrl + 'users/'
    }


    /**
     * Get the list of users
     */
    index():Observable<Array<User>> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Add a new user
     * @param user
     * @returns {Observable<R>}
     */
    public add(user:User) {
        return this.http.post(this.baseUrl, JSON.stringify(user))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Update a user
     * @param user
     * @returns {Observable<R>}
     */
    public update(user:User) {
        return this.http.put(this.baseUrl + user._id, JSON.stringify(user))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Delete a user
     * @param user
     * @returns {Observable<R>}
     */
    public delete(user:User) {
        return this.http.delete(this.baseUrl + user._id)
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
        return body || {};
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