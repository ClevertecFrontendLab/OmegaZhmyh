import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

import { yeedaaApi } from '~/shared/api/yeedaaApi';
import { API_URLS, HTTP_METHODS, TOKEN_KEY } from '~/shared/config';

import {
    AuthResponse,
    ForgotPasswordRequest,
    LoginRequest,
    ResetPasswordRequest,
    SignupRequest,
    VerifyOtpRequest,
} from '../model/auth.types';
import { setCredentials } from '../model/authSlice';

export const authApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: API_URLS.AUTH.LOGIN,
                method: HTTP_METHODS.POST,
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
                url: API_URLS.AUTH.SIGNUP,
                method: HTTP_METHODS.POST,
                body: userData,
            }),
        }),
        forgotPassword: builder.mutation<AuthResponse, ForgotPasswordRequest>({
            query: (email) => ({
                url: API_URLS.AUTH.FORGOT_PASSWORD,
                method: HTTP_METHODS.POST,
                body: email,
            }),
        }),
        verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
            query: (otpData) => ({
                url: API_URLS.AUTH.VERIFY_OTP,
                method: HTTP_METHODS.POST,
                body: otpData,
            }),
        }),
        resetPassword: builder.mutation<AuthResponse, ResetPasswordRequest>({
            query: (passwordData) => ({
                url: API_URLS.AUTH.RESET_PASSWORD,
                method: HTTP_METHODS.POST,
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
