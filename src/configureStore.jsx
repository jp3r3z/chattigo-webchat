import { createStore } from 'redux';
import ChattigoReducer from  './reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(ChattigoReducer, persistedState);

    store.subscribe(() => {
        const state = store.getState();
        saveState(state);
    });

    return store;
}

export default configureStore;
