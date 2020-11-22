import userAPI from './userAPI';


// functions courtesy of https://www.youtube.com/watch?v=o_Ni4Cqh4XA

export const saveToLocalStorage: any = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e)
    }


}


export const loadFromLocalStorage: any = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e)
        return undefined
    }

}

