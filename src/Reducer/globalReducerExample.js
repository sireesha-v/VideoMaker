import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    message: "toaster message if any :P",
    error: "in case of any error or just a back up data",
};

const globalReducerSlice = createSlice({
    name: "global", // has to be unique across all reducers
    reducers: {
        // keys will be actions
        commonAction: (state) => {
            state = initialState; // need not return anything, by default immer takes care of mutation and returning
        },
    },
    initialState,
});

const {
    reducer: globalReducer,
    actions: { commonAction },
} = globalReducerSlice; // slice contains two things reducer and actions

export { commonAction };

export default globalReducer;
