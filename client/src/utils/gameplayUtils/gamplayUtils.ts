
export default {
    // This function will take in 1 users meallogs and calculate their multiplier bonus.
    calculateMultiplierBonus: (arrayOfMeals: string[]): number => {
        let bonus= 1;
        const mealsOf3OrMore = [];
        const mealsOf5OrMore = [];
        const mealsOf7OrMore = [];
        // This counts each meal entry and pushes it into the appropriate category according to meal length.
        arrayOfMeals.forEach((meal) => {
            console.log(`This is the meal: ${meal}`);
            if(meal.length >= 7) {
                mealsOf7OrMore.push(meal);
            } else  if(meal.length >= 5){
                mealsOf5OrMore.push(meal);
            } else if(meal.length >= 3) {
                mealsOf3OrMore.push(meal);
            }
        });
        // This will assess the quantity of each diverse meal, delivering the highest bonus.
        // This system is based on a week long challenge, for selecting challenge length we will need add length of challenge parameter.
        if(mealsOf7OrMore.length >= 12) {
            bonus = 7;
        } else if (mealsOf5OrMore.length >= 12) {
            bonus = 5;
        } else if (mealsOf3OrMore.length >= 12) {
            bonus = 3
        } else {
            bonus = 1;
        }

        return bonus;
    },
    // we may need to double check the types for "arrayOfMeals". I tested this function in javascript and it works.
    totalVeggieArrayConstructor: (arrayOfMeals: []): string[] => {
        const totalVeggieArray: string[] = [];
        arrayOfMeals.forEach((meal: string[]) => {
            meal.forEach((item: string) => {
                totalVeggieArray.push(item);
            })
            
        })
        return totalVeggieArray;
    }
}