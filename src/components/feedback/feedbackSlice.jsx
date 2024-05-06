import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: 'Please overwrite your feedback',
}

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        updateFeedback: (state, action) => {
            state.message = action.payload;
        },
        deleteFeedback: (state) => {
            state.message = '';
        },
    }
})

export const { updateFeedback, deleteFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;