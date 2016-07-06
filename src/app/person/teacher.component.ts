import{Component} from '@angular/core';
import{TeacherService} from './teacher.service'
/**
 * Teachers management
 */
@Component({
    moduleId: module.id,
    selector: 'teacher',
    templateUrl: './teacher.component.html',
    providers:[TeacherService]
})
/**
 * 
 */
export class TeacherComponent {
    constructor(private teachers:TeacherService) {
        
    }


}

