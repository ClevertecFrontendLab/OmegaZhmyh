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
    },
    selectors: {
        selectNotificationAlert: (state) => state.notificationAlert,
        selectVerificationFailedModal: (state) => state.verificationFailedModal.isOpen,
    },
});

export const { setError, clearError, setVerificationFailedModal, clearVerificationFailedModal } =
    notificationSlice.actions;
export const { selectNotificationAlert, selectVerificationFailedModal } =
    notificationSlice.selectors;
