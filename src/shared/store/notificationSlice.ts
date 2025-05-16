import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalNotificationContent = {
    isOpen: boolean;
};

export type NotificationState = {
    notificationAlert: {
        isOpen: boolean;
        title: string | null;
        message: string | null;
    };
    verificationFailedModal: ModalNotificationContent;
    forgotPasswordModal: ModalNotificationContent;
    verifyOtpModal: ModalNotificationContent;
};

const initialState: NotificationState = {
    notificationAlert: {
        isOpen: false,
        title: null,
        message: null,
    },
    verificationFailedModal: {
        isOpen: false,
    },
    forgotPasswordModal: {
        isOpen: false,
    },
    verifyOtpModal: {
        isOpen: false,
    },
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ title: string; message: string }>) => {
            state.notificationAlert.isOpen = true;
            state.notificationAlert.title = action.payload.title;
            state.notificationAlert.message = action.payload.message;
        },
        clearError: (state) => {
            state.notificationAlert.isOpen = false;
            state.notificationAlert.title = null;
            state.notificationAlert.message = null;
        },
        setVerificationFailedModal: (state) => {
            state.verificationFailedModal.isOpen = true;
        },
        clearVerificationFailedModal: (state) => {
            state.verificationFailedModal.isOpen = false;
        },
        setForgotPasswordModal: (state) => {
            state.forgotPasswordModal.isOpen = true;
        },
        clearForgotPasswordModal: (state) => {
            state.forgotPasswordModal.isOpen = false;
        },
        setVerifyOtpModal: (state) => {
            state.verifyOtpModal.isOpen = true;
        },
        clearVerifyOtpModal: (state) => {
            state.verifyOtpModal.isOpen = false;
        },
    },
    selectors: {
        selectNotificationAlert: (state) => state.notificationAlert,
        selectVerificationFailedModal: (state) => state.verificationFailedModal.isOpen,
        selectForgotPasswordModal: (state) => state.forgotPasswordModal.isOpen,
        selectVerifyOtpModal: (state) => state.verifyOtpModal.isOpen,
    },
});

export const {
    setError,
    clearError,
    setVerificationFailedModal,
    clearVerificationFailedModal,
    setForgotPasswordModal,
    clearForgotPasswordModal,
    setVerifyOtpModal,
    clearVerifyOtpModal,
} = notificationSlice.actions;
export const {
    selectNotificationAlert,
    selectVerificationFailedModal,
    selectForgotPasswordModal,
    selectVerifyOtpModal,
} = notificationSlice.selectors;
