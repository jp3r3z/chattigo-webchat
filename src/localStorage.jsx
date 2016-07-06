const CHATTIGO_STATE = 'chattigo-state'

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(CHATTIGO_STATE);
        if (serializedState === null)
            return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

export const saveState = (state) => {
    let previousState = loadState();
    if (typeof previousState === undefined) {
        previousState = {};
    }
    try {
        const serializedState = JSON.stringify(Object.assign({}, previousState, state));
        localStorage.setItem(CHATTIGO_STATE, serializedState);
    } catch (error) {
        console.log('localStorage: ', 'problem saving current state: ', error);
    }
}