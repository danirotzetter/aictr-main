import{Component} from '@angular/core';
import{CourseService} from './course.service'
/**
 * Students management
 */
@Component({
    moduleId: module.id,
    selector: 'course',
    templateUrl: './course.component.html',
    providers:[CourseService]
})
/**
 * 
 */
export class CourseComponent {
    constructor(private courses:CourseService) {
        
    }


}

