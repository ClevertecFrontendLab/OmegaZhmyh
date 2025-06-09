import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '../config/api-urls.constants';
import { ApplicationState } from '../store/configure-store';
import { ImageUploadResponse, MeasureUnit } from './types';

export const TAG_TYPES = {
    RECIPE: 'Recipe',
    RECIPE_LIST: 'RecipeList',
    BOOKMARK: 'Bookmark',
    LIKE: 'Like',
    SUBSCRIPTION: 'Subscription',
};

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as ApplicationState).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 403) {
        const refreshResult = await baseQuery(
            { url: '/auth/refresh', method: 'GET', credentials: 'include' },
            api,
            extraOptions,
        );
        if (refreshResult.meta) {
            const token = refreshResult.meta.response?.headers.get('authentication-access');
            if (token) {
                localStorage.setItem('token', token);
                api.dispatch({ type: 'auth/setCredentials', payload: { token } });
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch({ type: 'auth/logout' });
            }
        }
    }
    return result;
};

export const yeedaaApi = createApi({
    reducerPath: 'yeedaaApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [TAG_TYPES.RECIPE, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE, TAG_TYPES.SUBSCRIPTION],
    endpoints: (builder) => ({
        getMeasureUnits: builder.query<MeasureUnit[], void>({
            query: () => '/measure-units',
            keepUnusedDataFor: Infinity,
        }),
        uploadImage: builder.mutation<ImageUploadResponse, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: '/file/upload',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const { useGetMeasureUnitsQuery, useUploadImageMutation } = yeedaaApi;
