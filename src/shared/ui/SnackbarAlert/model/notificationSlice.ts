import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationState = {
    errorTitle: string | null;
    errorMessage: string | null;
};

const initialState: NotificationState = {
    errorTitle: null,
    errorMessage: null,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ title: string; message: string }>) => {
            state.errorTitle = action.payload.title;
            state.errorMessage = action.payload.message;
        },
        clearError: (state) => {
            state.errorTitle = null;
            state.errorMessage = null;
        },
    },
    selectors: {
        selectError: (state) => state,
    },
});

export const { setError, clearError } = notificationSlice.actions;
export const { selectError } = notificationSlice.selectors;
