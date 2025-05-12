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
    code: string;
};

export type ResetPasswordRequest = {
    login: string;
    password: string;
    confirmPassword: string;
};

export interface AuthResponse {
    statusText: string;
    message: string;
}
