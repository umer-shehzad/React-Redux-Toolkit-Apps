import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../components/counter/counterSlice';
import postsSlice from './postsSlice';
import usersSlice from './usersSlice';
import feedbackSlice from '../components/feedback/feedbackSlice';

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        posts: postsSlice,
        users: usersSlice,
        feedback: feedbackSlice,
    }
})