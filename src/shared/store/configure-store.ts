import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categorySlice } from '~/entities/Category/model/slice';
import { recipeSlice } from '~/entities/Recipe/model/slice';
import { filterReducer } from '~/features/recipe-filters';
import { apiSlice } from '~/shared/query/create-api';
import { drawerReducer } from '~/widgets/Drawer';
import { layoutSlice } from '~/widgets/Layout/model/slice';

import appReducer, { appSlice } from './app-slice';

const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipeSlice.name]: recipeSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
    filters: filterReducer,
    drawer: drawerReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
