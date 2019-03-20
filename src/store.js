import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const NUM_TRADES = 1000;

export default function configureStore(initialState={}) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}