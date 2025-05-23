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
        left?: { base: string; lg: string } | string;
        bottom?: { base: string; lg: string } | string;
    };
    verificationErrorModal: ModalNotificationContent;
    emailVerificationModal: ModalNotificationContent & { email: string };
    forgotPasswordModal: ModalNotificationContent;
    verifyOtpModal: ModalNotificationContent & { email: string };
    accountRecoveryModal: ModalNotificationContent & { email: string };
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
    accountRecoveryModal: {
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
                left?: { base: string; lg: string } | string;
                bottom?: { base: string; lg: string } | string;
            }>,
        ) => {
            state.notificationAlert.isOpen = true;
            state.notificationAlert.title = action.payload.title;
            state.notificationAlert.message = action.payload.message ?? null;
            state.notificationAlert.status = action.payload.status ?? 'error';
            state.notificationAlert.left = action.payload.left ?? { base: '50%', lg: '50%' };
            state.notificationAlert.bottom = action.payload.bottom ?? {
                base: 'calc(var(--mobile-footer-height) + 16px)',
                lg: '80px',
            };
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
        setAccountRecoveryModal: (state, action: PayloadAction<{ email: string }>) => {
            state.accountRecoveryModal.isOpen = true;
            state.accountRecoveryModal.email = action.payload.email;
        },
        clearAccountRecoveryModal: (state) => {
            state.accountRecoveryModal.isOpen = false;
            state.accountRecoveryModal.email = '';
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
        selectAccountRecoveryModal: (state) => state.accountRecoveryModal.isOpen,
        selectAccountRecoveryModalEmail: (state) => state.accountRecoveryModal.email,
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
    setAccountRecoveryModal,
    clearAccountRecoveryModal,
} = notificationSlice.actions;
export const {
    selectNotificationAlert,
    selectVerificationErrorModal,
    selectEmailVerificationModal,
    selectEmailVerificationModalEmail,
    selectForgotPasswordModal,
    selectVerifyOtpModal,
    selectVerifyOtpModalEmail,
    selectAccountRecoveryModal,
    selectAccountRecoveryModalEmail,
} = notificationSlice.selectors;
