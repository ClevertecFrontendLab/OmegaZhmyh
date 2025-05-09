import { createSlice } from '@reduxjs/toolkit';

export type DrawerState = {
    isDrawerOpen: boolean;
};

const initialState: DrawerState = {
    isDrawerOpen: false,
};

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        toggleIsOpenDrawer(state) {
            state.isDrawerOpen = !state.isDrawerOpen;
        },
    },
    selectors: {
        selectIsDrawerOpen: (state) => state.isDrawerOpen,
    },
});

export const { toggleIsOpenDrawer } = drawerSlice.actions;
export const { selectIsDrawerOpen } = drawerSlice.selectors;
