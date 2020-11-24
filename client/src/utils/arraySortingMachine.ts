// this function takes 2 arrays, combines them and removes any duplicates

export default {
    arraySort: (newArray: string[], databaseArray: string[]): string[] => {
        const sortedArray = newArray.concat(databaseArray.filter((item) => {
            return (newArray.indexOf(item) < 0)
        }))
        return sortedArray;
    }
}

