import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { API_BASE_URL } from '~/shared/config/api-urls';
import { ApplicationState } from '~/shared/store/configure-store';

import {
    AuthResponse,
    ForgotPasswordRequest,
    LoginRequest,
    ResetPasswordRequest,
    SignupRequest,
    VerifyOtpRequest,
} from '../types/auth.types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as ApplicationState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation<AuthResponse, SignupRequest>({
            query: (userData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userData,
            }),
        }),
        forgotPassword: builder.mutation<AuthResponse, ForgotPasswordRequest>({
            query: (email) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: email,
            }),
        }),
        verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
            query: (otpData) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: otpData,
            }),
        }),
        resetPassword: builder.mutation<AuthResponse, ResetPasswordRequest>({
            query: (passwordData) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: passwordData,
            }),
        }),
    }),
});
