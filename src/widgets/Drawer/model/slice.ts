import { createSlice } from '@reduxjs/toolkit';

export interface DrawerState {
    isDrawerOpen: boolean;
}

const initialState: DrawerState = {
    isDrawerOpen: false,
};

export const drawerSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleIsOpenDrawer(state) {
            state.isDrawerOpen = !state.isDrawerOpen;
        },
    },
});

export const { toggleIsOpenDrawer } = drawerSlice.actions;
export const { reducer: drawerReducer } = drawerSlice;
