import { createSlice } from "@reduxjs/toolkit";

const randomPrivatePageReducerSlice = createSlice({
    name: "randomPrivatePage", // has to be unique across all reducers
    reducers: {
        // keys will be actions
        incrementAction: (state, action) => {
            state.data.asyncCounter = state.data.asyncCounter + action.payload;
        },
        decrementAction: {
            prepare: (amount) => {
                // function which takes of action before dispatch
                return { payload: -amount };
            },
            reducer: (state, action) => {
                // reducer
                state.data.asyncCounter =
                    state.data.asyncCounter + action.payload;
            },
        },
    },
    initialState: {
        data: {
            asyncCounter: 0,
        },
    },
});

const {
    reducer: randomPrivatePageReducer,
    actions: { incrementAction, decrementAction },
} = randomPrivatePageReducerSlice;

export { incrementAction, decrementAction };

export default randomPrivatePageReducer;
