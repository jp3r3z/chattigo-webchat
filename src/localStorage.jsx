export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
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
        localStorage.setItem('chattigo-state', serializedState);
    } catch (error) {
        console.log('localStorage: ', 'problem saving current state: ', error);
    }
}