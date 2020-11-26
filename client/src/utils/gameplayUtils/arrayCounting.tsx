import _ from 'lodash';

export default {
    itemOccuranceInArray: (array: string[]): number => {
       const newCount=  _.countBy(array);
       const occurancesArray = _.values(newCount);
       let totalArrayPoints= 0;
       occurancesArray.forEach((number) => {
           if(number >= 3) {
               totalArrayPoints += 3;
           } else if(number < 3) {
               totalArrayPoints += number;
           }
       })
       return totalArrayPoints;
    }
    
}