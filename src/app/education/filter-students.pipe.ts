import {Pipe} from '@angular/core';

// # Filter Array of Objects
@Pipe({name: 'filterStudents',
    pure: false // Stateful pipe: observing all values (less efficient, but required to detect changes of the filter arguments)
})
export class FilterStudentsPipe {
    transform(studentsInput:any[], args: any[]):any {
        if (!args[0]) {
            return studentsInput;
        } else if (studentsInput) {
            var studentsToBeFiltered = args;
            return studentsInput.filter(student => {
                // Do not add the student, if it is in the list of to-be-filtered students
                var isInFilter=false;
                studentsToBeFiltered.forEach(function (studentToBeFiltered) {
                    if (studentToBeFiltered._id == student._id) {
                        isInFilter=true;
                    }
                });
                return !isInFilter;
            });
        }
    }
}