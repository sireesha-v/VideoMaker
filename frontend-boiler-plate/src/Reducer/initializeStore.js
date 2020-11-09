import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { routeMiddleware } from "../Router/createHistory";
import createReducer from "./rootReducer";
import sagaMiddleware from "../Saga/sagaMiddleware";
import asyncReducersObjectMapping from "./AsyncReducers";
import rootSaga from "../Saga/rootSaga";

/**
 * Initialize store function,
 * here the saga middleware is added as well.
 */
const initializeStore = () => {
    // create a store
    const store = configureStore({
        reducer: createReducer(),
        middleware: [
            routeMiddleware,
            sagaMiddleware,
            ...getDefaultMiddleware({ thunk: false }), // by default toolkit will have thunk, so negating it
        ],
        devTools: process.env.NODE_ENV === "development", // show Redux Dev Tools on inspect console on development env
    });

    store.injectReducer = (asyncReducerNamesList = [], clearData = false) => {
        // clear all reducer when logging out of application
        if (clearData) {
            store.replaceReducer(createReducer({}, clearData));
            return store;
        }

        // the object containing all the asynchronous reducer names, this will later on added to the main reducer store object in createReducer function
        const asyncReducers = {};

        // mapping all the reducer functions for the names
        asyncReducerNamesList.forEach((asyncReducerName) => {
            asyncReducers[asyncReducerName] =
                asyncReducersObjectMapping[asyncReducerName];
        });

        // replace the current reducer with the new reducer including the asynchronous reducers
        store.replaceReducer(createReducer(asyncReducers));
        return store;
    };

    // adding the root saga to the middleware
    sagaMiddleware.run(rootSaga);

    return store;
};

export default initializeStore;
