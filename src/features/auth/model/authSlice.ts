import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

type AuthState = {
    token: string | null;
    user: User | null;
};

const initialState: AuthState = {
    token: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
