const testArray = [
    ["I am one", "two", "three"],
    ["I am four", "five", "six"],
    ["I am seven", "eight", "nine"]
];

const totalVeggieArrayConstructor = (arrayOfMeals) => {
    const totalVeggieArray= [];
    arrayOfMeals.forEach((meal) => {
        meal.forEach((item) => {
            totalVeggieArray.push(item);
        })
        
    })
    return totalVeggieArray;
};

console.log(totalVeggieArrayConstructor(testArray));