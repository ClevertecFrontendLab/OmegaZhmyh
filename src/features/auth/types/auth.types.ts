export type LoginRequest = {
    login: string;
    password: string;
};

export type SignupRequest = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
};

export type ForgotPasswordRequest = {
    email: string;
};

export type VerifyOtpRequest = {
    email: string;
    otpToken: string;
};

export type ResetPasswordRequest = {
    login: string;
    password: string;
    confirmPassword: string;
};

export type AuthResponse = {
    message: string;
    statusText: string;
};

export type ErrorResponse = {
    status: number;
    data?: {
        statusCode: number;
        message: string;
        error?: string;
    };
};

export const isErrorResponse = (error: unknown): error is ErrorResponse =>
    typeof error === 'object' && error !== null && 'status' in error;
