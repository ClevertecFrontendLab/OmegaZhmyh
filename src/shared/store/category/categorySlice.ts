import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    selectors: { getCategores: (state) => state },
});

export const { getCategores } = categorySlice.selectors;
