import { createSlice } from "@reduxjs/toolkit";

const NewVideoDashboardPageReducerSlice = createSlice({
    name: "newVideoDashboard", // has to be unique across all reducers
    reducers: {
        // keys will be actions
        storeVideoUrl: (state, action) => {
            state.videoOutput = action.payload;
        },

    },
    initialState: {
        videoOutput: {},
    },
});

const {
    reducer: NewVideoDashboardPageReducer,
    actions: { storeVideoUrl },
} = NewVideoDashboardPageReducerSlice;

export { storeVideoUrl };

export default NewVideoDashboardPageReducer;
