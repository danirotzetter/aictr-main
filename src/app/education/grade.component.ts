import{Component} from '@angular/core';
import{GradeService} from './grade.service'
/**
 * Grade management
 */
@Component({
    moduleId: module.id,
    selector: 'grade',
    templateUrl: './grade.component.html',
    providers:[GradeService]
})
/**
 * 
 */
export class GradeComponent {
    constructor(private grades:GradeService) {
        
    }


}

