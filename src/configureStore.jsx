import { createStore } from 'redux';
import ChattigoReducer from  './reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
    const persistedState = loadState();
    let store = null;
    if (process.env.NODE_ENV !== "production") {
        store = createStore(ChattigoReducer, persistedState,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    } else {
        store = createStore(ChattigoReducer, persistedState);
    }

    store.subscribe(() => {
        const state = store.getState();
        saveState(state);
    });

    return store;
}

export default configureStore;
