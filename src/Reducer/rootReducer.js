import { combineReducers } from "redux";
import { historyReducer as router } from "../Router/createHistory";
import globalReducerExample from "./globalReducerExample";

/**
 * Create reducer function
 * @param {object} asyncReducers
 * Creates the final reducer object with all the global reducers and asynchronous reducers
 */
const createReducer = (asyncReducers = {}) => {
    const appReducer = combineReducers({
        router,
        globalReducerExample,
        // Adds the asynchronous reducers
        ...asyncReducers,
    });

    // we add this to reset the reducer on logout
    return (state, action) => {
        if (action.type === "LOGOUT_USER") {
            const { router } = state;

            // keeping the "router" while reset to maintain the sanctity of the connected router.
            state = { router };
        }
        return appReducer(state, action);
    };
};

export default createReducer;
