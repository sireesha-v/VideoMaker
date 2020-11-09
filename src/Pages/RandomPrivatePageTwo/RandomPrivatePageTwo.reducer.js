import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: { dashboard: null },
    message: "toaster message if any :P",
    error: "in case of any error or just a back up data",
};

const randomPrivatePageTwoReducerSlice = createSlice({
    name: "randomPrivatePageTwoReducer",
    reducers: {
        commonAction: (state) => {
            state = initialState;
        },
    },
    initialState,
});

const {
    reducer: randomPrivatePageTwoReducer,
    actions: { commonAction },
} = randomPrivatePageTwoReducerSlice;

export { commonAction };

export default randomPrivatePageTwoReducer;
