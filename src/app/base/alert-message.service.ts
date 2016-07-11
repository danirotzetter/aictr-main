import{EventEmitter} from '@angular/core';
import {AlertMessage} from './alert-message';

/**
 * Service in order to keep track of and provide alert messages
 */
export class AlertMessageService {
    public alertAdded: EventEmitter<AlertMessage>;
    private alertMessages: AlertMessage[] = [];

    constructor() {
        this.alertAdded = new EventEmitter<AlertMessage>();
    }

    public list(): AlertMessage[] {
        return this.alertMessages;
    }

    public add(alertMessage: AlertMessage): void {
        this.alertMessages.push(alertMessage);
        this.alertAdded.emit(alertMessage);
    }
}