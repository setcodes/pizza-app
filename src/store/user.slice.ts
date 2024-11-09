import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { ILoginResponse } from '../interfaces/LoginResponse';

export const JWT_PERSISTANT_STATE = 'userData';

export interface UserPersistantState {
	jwt: string | null;
}

export interface UserState {
	jwt: string | null;
	errorMessage?: string;
}

const initialState: UserState = {
	jwt: loadState<UserPersistantState>(JWT_PERSISTANT_STATE)?.jwt && null,
};

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<ILoginResponse>(
				`${PREFIX}/auth/login`,
				{
					email: params.email,
					password: params.password,
				}
			);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearErrorMessage: (state) => {
			state.errorMessage = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.errorMessage = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
