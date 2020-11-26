// this function takes 2 arrays, combines them and removes any duplicates

const arraySortUniqueVeggies = (newArray: string[], databaseArray: string[]): string[] => {
    const sortedArray = newArray.concat(databaseArray.filter((item) => {
        return (newArray.indexOf(item) < 0)
    }))
    return sortedArray;
};

export default arraySortUniqueVeggies;