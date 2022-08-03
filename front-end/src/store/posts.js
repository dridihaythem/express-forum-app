import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('posts/getPosts', async (data, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	try {
		const response = await axios({
			method: 'GET',
			url: `${process.env.REACT_APP_BACKEND_URL}/posts`,
		});
		return response.data;
	} catch (e) {
		return rejectWithValue(e.response.data.errors);
	}
});

export const getPost = createAsyncThunk('posts/getPost', async (slug, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	try {
		const response = await axios({
			method: 'GET',
			url: `${process.env.REACT_APP_BACKEND_URL}/posts/${slug}`,
		});
		return response.data.data;
	} catch (e) {
		return rejectWithValue(e.response.data.errors);
	}
});

const initialState = { loading: true, posts: [] };

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[getPosts.pending]: (state, action) => {
			state.loading = true;
		},
		[getPosts.fulfilled]: (state, action) => {
			state.loading = false;
			state.posts = action.payload.data;
		},
		[getPosts.rejected]: (state, action) => {
			state.loading = false;
			state.posts = [];
		},
		[getPost.pending]: (state, action) => {
			state.loading = true;
		},
		[getPost.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[getPost.rejected]: (state, action) => {
			state.loading = false;
		},
	},
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
