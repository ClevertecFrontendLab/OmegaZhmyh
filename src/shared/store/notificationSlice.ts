import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalNotificationContent = {
    isOpen: boolean;
};

export type NotificationState = {
    notificationAlert: {
        isOpen: boolean;
        title: string | null;
        message: string | null;
        status: 'success' | 'error';
    };
    verificationErrorModal: ModalNotificationContent;
    emailVerificationModal: ModalNotificationContent & { email: string };
    forgotPasswordModal: ModalNotificationContent;
    verifyOtpModal: ModalNotificationContent & { email: string };
};

const initialState: NotificationState = {
    notificationAlert: {
        isOpen: false,
        title: null,
        message: null,
        status: 'error',
    },
    emailVerificationModal: {
        isOpen: false,
        email: '',
    },
    verificationErrorModal: {
        isOpen: false,
    },
    forgotPasswordModal: {
        isOpen: false,
    },
    verifyOtpModal: {
        isOpen: false,
        email: '',
    },
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setError: (
            state,
            action: PayloadAction<{
                title: string;
                message?: string | null;
                status?: 'success' | 'error';
            }>,
        ) => {
            state.notificationAlert.isOpen = true;
            state.notificationAlert.title = action.payload.title;
            state.notificationAlert.message = action.payload.message ?? null;
            state.notificationAlert.status = action.payload.status ?? 'error';
        },
        clearError: (state) => {
            state.notificationAlert.isOpen = false;
            state.notificationAlert.title = null;
            state.notificationAlert.message = null;
            state.notificationAlert.status = 'error';
        },
        setEmailVerificationModal: (state, action: PayloadAction<{ email: string }>) => {
            state.emailVerificationModal.isOpen = true;
            state.emailVerificationModal.email = action.payload.email;
        },
        clearEmailVerificationModal: (state) => {
            state.emailVerificationModal.isOpen = false;
            state.emailVerificationModal.email = '';
        },
        setVerificationErrorModal: (state) => {
            state.verificationErrorModal.isOpen = true;
        },
        clearVerificationErrorModal: (state) => {
            state.verificationErrorModal.isOpen = false;
        },
        setForgotPasswordModal: (state) => {
            state.forgotPasswordModal.isOpen = true;
        },
        clearForgotPasswordModal: (state) => {
            state.forgotPasswordModal.isOpen = false;
        },
        setVerifyOtpModal: (state, action: PayloadAction<{ email: string }>) => {
            state.verifyOtpModal.isOpen = true;
            state.verifyOtpModal.email = action.payload.email;
        },
        clearVerifyOtpModal: (state) => {
            state.verifyOtpModal.isOpen = false;
            state.verifyOtpModal.email = '';
        },
    },
    selectors: {
        selectNotificationAlert: (state) => state.notificationAlert,
        selectVerificationErrorModal: (state) => state.verificationErrorModal.isOpen,
        selectEmailVerificationModal: (state) => state.emailVerificationModal.isOpen,
        selectEmailVerificationModalEmail: (state) => state.emailVerificationModal.email,
        selectForgotPasswordModal: (state) => state.forgotPasswordModal.isOpen,
        selectVerifyOtpModal: (state) => state.verifyOtpModal.isOpen,
        selectVerifyOtpModalEmail: (state) => state.verifyOtpModal.email,
    },
});

export const {
    setError,
    clearError,
    setEmailVerificationModal,
    clearEmailVerificationModal,
    setVerificationErrorModal,
    clearVerificationErrorModal,
    setForgotPasswordModal,
    clearForgotPasswordModal,
    setVerifyOtpModal,
    clearVerifyOtpModal,
} = notificationSlice.actions;
export const {
    selectNotificationAlert,
    selectVerificationErrorModal,
    selectEmailVerificationModal,
    selectEmailVerificationModalEmail,
    selectForgotPasswordModal,
    selectVerifyOtpModal,
    selectVerifyOtpModalEmail,
} = notificationSlice.selectors;
