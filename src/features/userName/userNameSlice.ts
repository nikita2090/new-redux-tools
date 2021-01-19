import {
    createAsyncThunk,
    createSlice,
    SerializedError,
} from '@reduxjs/toolkit';

import axios from 'axios';

import { RootState } from '../../store';

export interface IRes {
    name: {
        first: string;
        last: string;
        title: string;
    };
}

export interface IResponse {
    info?: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
    results: IRes[];
}

export const fetchUserData = createAsyncThunk(
    'userName/fetch',
    async (arg, thunkAPI) => {
        console.log(arg, thunkAPI);
        const res = await axios('https://randomuser.me/api/?inc=name');
        return res.data as IResponse;
    }
);

export interface IUserNameSlice {
    name: string;
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: null | SerializedError;
}

const initialState: IUserNameSlice = {
    name: '',
    status: 'idle',
    error: null,
};

export const userNameSlice = createSlice({
    name: 'userName',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'success';
                state.name = action.payload.results[0].name.first;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            });
    },
});

export const userNameSelector = (state: RootState): IUserNameSlice =>
    state.userName;
export default userNameSlice.reducer;
