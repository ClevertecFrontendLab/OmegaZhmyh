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

export type SuccessResponse = {
    message: string;
    statusText: string;
};

export type ErrorResponse = {
    statusCode: number;
    message: string;
    error: string;
};

export type AuthResponse = SuccessResponse | ErrorResponse;
