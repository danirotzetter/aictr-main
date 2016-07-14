import {Pipe} from '@angular/core';

// # Filter Array of Objects
@Pipe({name: 'filterMetrics',
    pure: false // Stateful pipe: observing all values (less efficient, but required to detect changes of the filter arguments)
})
export class FilterMetricsPipe {
    transform(metricsInput:any[], args: any[]):any {
        if (!args[0]) {
            return metricsInput;
        } else if (metricsInput) {
            var metricsToBeFiltered = args;
            return metricsInput.filter(metric => {
                // Do not add the metric, if it is in the list of to-be-filtered metrics
                var isInFilter=false;
                metricsToBeFiltered.forEach(function (metricToBeFiltered) {
                    if (metricToBeFiltered._id == metric._id) {
                        isInFilter=true;
                    }
                });
                return !isInFilter;
            });
        }
    }
}