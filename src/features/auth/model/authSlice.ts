import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import { JwtPayload } from '../types/auth.types';

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    userId: string | null;
};

const TOKEN_KEY = 'token';

const getUserIdFromToken = (token: string | null) => {
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.userId;
};

const initialToken = localStorage.getItem(TOKEN_KEY);

const initialState: AuthState = {
    token: initialToken,
    isAuthenticated: !!initialToken,
    userId: getUserIdFromToken(initialToken),
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
        selectUserId: (state) => state.userId,
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const { selectIsAuthenticated, selectAuthToken, selectUserId } = authSlice.selectors;
