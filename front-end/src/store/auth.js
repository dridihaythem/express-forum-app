import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	try {
		const response = await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
			data,
		});
		return response.data;
	} catch (e) {
		return rejectWithValue(e.response.data.errors);
	}
});

const initialState = { auth: false, token: null, user: {}, loading: false, errors: [] };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.auth = false;
			state.user = {};
			state.token = null;
			localStorage.removeItem('token');
		},
		updateUser(state, action) {
			state.user = action.payload.user;
		},
	},
	extraReducers: {
		// Register
		[register.pending]: (state, action) => {
			state.loading = true;
			state.errors = [];
		},
		[register.fulfilled]: (state, action) => {
			state.loading = false;
			state.auth = true;
			state.token = action.payload.token;
			state.user = action.payload.data;
			state.errors = [];
		},
		[register.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
