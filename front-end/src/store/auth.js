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

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	try {
		const response = await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
			data,
		});
		return response.data;
	} catch (e) {
		const response = e.response.data;
		if (response.hasOwnProperty('message')) {
			return rejectWithValue([{ param: 'default', message: response.message }]);
		}
		return rejectWithValue(response.errors);
	}
});

export const autoLogin = createAsyncThunk('auth/autologin', async (data, thunkAPI) => {
	const { dispatch } = thunkAPI;
	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');
	if (token && user) {
		// fast login with data from local storage
		dispatch(authActions.updateUser({ token, user: JSON.parse(user) }));
		try {
			// check valid data
			const response = await axios({
				method: 'GET',
				url: `${process.env.REACT_APP_BACKEND_URL}/auth/me`,
				headers: { Authorization: `Bearer ${token}` },
			});
			// console.log(response.data.data);
			dispatch(authActions.updateUser({ token, user: response.data.data }));
		} catch (e) {
			dispatch(authActions.logout());
		}
	}
});

const initialState = { auth: false, token: null, user: {}, loading: false };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.auth = false;
			state.user = {};
			state.token = null;
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		},
		updateUser(state, action) {
			state.auth = true;
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
	},
	extraReducers: {
		// Register
		[register.pending]: (state, action) => {
			state.loading = true;
		},
		[register.fulfilled]: (state, action) => {
			state.loading = false;
			state.auth = true;
			state.token = action.payload.token;
			state.user = action.payload.data;
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('user', JSON.stringify(action.payload.data));
		},
		[register.rejected]: (state, action) => {
			state.loading = false;
		},
		// Register
		[login.pending]: (state, action) => {
			state.loading = true;
		},
		[login.fulfilled]: (state, action) => {
			state.loading = false;
			state.auth = true;
			state.token = action.payload.token;
			state.user = action.payload.data;
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('user', JSON.stringify(action.payload.data));
		},
		[login.rejected]: (state, action) => {
			state.loading = false;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
