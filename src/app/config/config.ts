import {Injectable, Inject} from "@angular/core";

/**
 * Class to define configuration
 */
@Injectable()
export class ConfigService {
    public baseUrl: String;
    constructor(){
        this.baseUrl = 'http://localhost:3000/';
    }

}