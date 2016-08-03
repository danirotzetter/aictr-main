import '../../lib/date-1.0.0.min.js'
declare var Date:any;

import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Project} from './project.model';
import {ConfigService} from '../config/config.service';


@Injectable()
export class ProjectService {
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService) {
        this.baseUrl = this.config.baseUrl + 'projects/'
    }


    /**
     * Get the list of projects
     */
    index():Observable<Array<Project>> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Get a specific project
     * @param id
     * @returns {Observable<R>}
     */
    public get(id:number) {
        return this.http.get(this.baseUrl+id)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**
     *
     * Get a project based on an activity
     * @param activityId
     * @returns {Observable<R>}
     */
    public getByActivity(activityId:number) {
        return this.http.get(this.baseUrl+'byActivity?activityId='+activityId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**
     *
     * Add a new project
     * @param project
     * @returns {Observable<R>}
     */
    public add(project:Project) {
        return this.http.post(this.baseUrl, JSON.stringify(project))
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**
     *
     * Update a project
     * @param project
     * @returns {Observable<R>}
     */
    public update(project:Project) {
        return this.http.put(this.baseUrl+project._id, JSON.stringify(project))
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**
     *
     * Delete a project
     * @param project
     * @returns {Observable<R>}
     */
    public delete(project:Project) {
        return this.http.delete(this.baseUrl+project._id)
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
        if (body){
            /*if (body.activities){
                body.activities.forEach(function (activity) {
                    if (activity.date){
                    activity.date=Date.parse(activity.date).toString('yyyy-MM-dd')
                    }
                });
            }*/
            return body;
        }
        else return {};
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