import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
};

const TOKEN_KEY = 'token';

const initialState: AuthState = {
    token: localStorage.getItem(TOKEN_KEY),
    isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem(TOKEN_KEY);
        },
    },
    selectors: {
        selectIsAuthenticated: (state) => state.isAuthenticated,
        selectAuthToken: (state) => state.token,
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const { selectIsAuthenticated, selectAuthToken } = authSlice.selectors;
