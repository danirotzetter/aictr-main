import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Teacher} from './teacher.model';
import {ConfigService} from '../config/config.service';


@Injectable()
export class TeacherService{
    private baseUrl:string;

    constructor(private http:Http, private config:ConfigService){
        this.baseUrl=this.config.baseUrl+'teachers/'
    }


    /**
     * Get the list of teachers
     */
    index():Observable<Teacher>{
        return this.http.get(this.baseUrl)
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