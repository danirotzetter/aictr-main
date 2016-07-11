import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Course} from './course.model';
import {ConfigService} from '../config/config.service';


@Injectable()
export class CourseService {
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService) {
        this.baseUrl = this.config.baseUrl + 'courses/'
    }


    /**
     * Get the list of courses
     */
    index():Observable<Array<Course>> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Add a new course
     * @param course
     * @returns {Observable<R>}
     */
    public add(course:Course) {
        return this.http.post(this.baseUrl, JSON.stringify(course))
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     *
     * Update a course
     * @param course
     * @returns {Observable<R>}
     */
    public update(course:Course) {
        return this.http.put(this.baseUrl+course._id, JSON.stringify(course))
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     *
     * Delete a course
     * @param course
     * @returns {Observable<R>}
     */
    public delete(course:Course) {
        return this.http.delete(this.baseUrl+course._id)
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