import {Injectable, Inject} from "@angular/core";

/**
 * Class to define configuration
 */
@Injectable()
export class ConfigService {
    public baseUrl: string; // URL to call the backend
    constructor(){
        this.baseUrl = 'http://localhost:3000/';
    }

}