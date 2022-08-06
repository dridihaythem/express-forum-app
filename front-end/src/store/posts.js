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


export const getUnpublishedPosts = createAsyncThunk('posts/getUnpublishedPosts', async (data, thunkAPI) => {
	const { rejectWithValue, getState } = thunkAPI;
	try {
		const response = await axios({
			method: 'GET',
			url: `${process.env.REACT_APP_BACKEND_URL}/posts/findUnpublished`,
			headers: { Authorization: `Bearer ${getState().auth.token}` }
		});
		return response.data.data;
	} catch (e) {
		return rejectWithValue(e.response.data.errors);
	}
});

export const takeAction = createAsyncThunk('posts/takeAction', async (data, thunkAPI) => {
	const { rejectWithValue, getState } = thunkAPI;
	try {
		console.log(data)

		const method = data.action === 'publish' ? 'PATCH' : 'DELETE';
		const url = data.action === 'publish' ? `posts/${data.slug}/publish` : `posts/${data.slug}`;
		const body = data.action == 'delete' ? { ban: data.action.ban } : {}

		const response = await axios({
			method,
			url: `${process.env.REACT_APP_BACKEND_URL}/${url}`,
			headers: { Authorization: `Bearer ${getState().auth.token}` },
			body
		});

		return response;
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
		[getUnpublishedPosts.pending]: (state, action) => {
			state.loading = true;
			state.posts = [];
		},
		[getUnpublishedPosts.fulfilled]: (state, action) => {
			state.loading = false;
			state.posts = action.payload
		},
		[getUnpublishedPosts.rejected]: (state, action) => {
			state.loading = false;
			state.posts = [];
		},
		[takeAction.fulfilled]: (state, action) => {
			const slug = action.meta.arg.slug;
			state.posts = state.posts.filter(post => post.slug !== slug);
		},
	},
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
