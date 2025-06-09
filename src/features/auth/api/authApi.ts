import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

import { yeedaaApi } from '~/shared/api/yeedaaApi';

import { setCredentials } from '../model/authSlice';
import {
    AuthResponse,
    ForgotPasswordRequest,
    LoginRequest,
    ResetPasswordRequest,
    SignupRequest,
    VerifyOtpRequest,
} from '../types/auth.types';

const TOKEN_KEY = 'token';

export const authApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                credentials: 'include',
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { meta } = await queryFulfilled;
                const token = (meta as FetchBaseQueryMeta)?.response?.headers.get(
                    'authentication-access',
                );
                if (token) {
                    localStorage.setItem(TOKEN_KEY, token);
                    dispatch(setCredentials({ token }));
                }
            },
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

export const {
    useLoginMutation,
    useSignupMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApi;
