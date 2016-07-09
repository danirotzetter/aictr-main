/**
 * Alert message definitions
 */
export class AlertMessage {
    public type:string;
    constructor(private originalType:AlertMessageType, public message: String, public dismissOnTimeout?:number) {
        // By default: dismiss after 10 seconds
        this.dismissOnTimeout=dismissOnTimeout||10000;

        switch(originalType){
            case AlertMessageType.SUCCESS:
                this.type='success';
                break;
            case AlertMessageType.INFO:
                this.type='info';
                break;
            case AlertMessageType.WARNING:
                this.type='warning';
                break;
            case AlertMessageType.DANGER:
                this.type='danger';
                break;
        }
    }
}

/**
 * Types for an alert message
 */
export enum AlertMessageType{
    SUCCESS,
    INFO,
    WARNING,
    DANGER
} 