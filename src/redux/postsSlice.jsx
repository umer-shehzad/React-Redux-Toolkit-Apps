import { createSlice, nanoid, createAsyncThunk, Tuple } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        try {
            const response = await axios.get(POST_URL);
            return [...response.data]; //return a data in new array 
        } catch (err) {
            return err.message;
        }
    }
)

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (newPost) => {
        try {
            const response = await axios.post(POST_URL, newPost);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (getPost) => {
        const { id } = getPost;
        try {
            const response = await axios.put(`${POST_URL}/${id}`, getPost);
            return response.data;
        } catch (err) {
            // return err.message;
            return getPost; //for redux testing only
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (getPost) => {
        const { id } = getPost;
        try {
            const response = await axios.delete(`${POST_URL}/${id}`);
            if(response?.status === 200) return getPost;
            return `${response?.status}: ${response?.statusText}`
        } catch (err) {
            return err.message;
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),   
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                        }
                    }
                }
            }
        },
        addReaction(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //add date and reaction
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                    }
                    return post;
                });
                // Add any fetched posts to the array
                // state.posts = state.posts.concat(loadedPosts); //issue- duplicating the post data in redux store
                state.posts = loadedPosts;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                }
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id){
                    console.log('Update coud not complete');
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id){
                    console.log('Delete coud not complete');
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts;
            })
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;