export default {
    arraySort: (newArray: string[], databaseArray: string[]): string[] => {
        const sortedArray = newArray.concat(databaseArray.filter((item) => {
            return (newArray.indexOf(item) < 0)
        }))
        return sortedArray;
    }
}

