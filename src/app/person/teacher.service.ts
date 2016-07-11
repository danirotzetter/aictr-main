import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Teacher} from './teacher.model';
import {ConfigService} from '../config/config.service';


@Injectable()
export class TeacherService {
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService) {
        this.baseUrl = this.config.baseUrl + 'teachers/'
    }


    /**
     * Get the list of teachers
     */
    index():Observable<Array<Teacher>> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * Add a new teacher
     * @param teacher
     * @returns {Observable<R>}
     */
    public add(teacher:Teacher) {
        return this.http.post(this.baseUrl, JSON.stringify(teacher))
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     *
     * Update a teacher
     * @param teacher
     * @returns {Observable<R>}
     */
    public update(teacher:Teacher) {
        return this.http.put(this.baseUrl+teacher._id, JSON.stringify(teacher))
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     *
     * Delete a teacher
     * @param teacher
     * @returns {Observable<R>}
     */
    public delete(teacher:Teacher) {
        return this.http.delete(this.baseUrl+teacher._id)
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