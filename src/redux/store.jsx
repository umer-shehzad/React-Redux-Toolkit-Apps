import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../components/counter/counterSlice';
import postsSlice from './postsSlice';
import usersSlice from './usersSlice';

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        posts: postsSlice,
        users: usersSlice,
    }
})