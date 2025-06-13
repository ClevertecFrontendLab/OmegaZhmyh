import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL, API_URLS, HTTP_METHODS, HTTP_STATUS, TOKEN_KEY } from '../config';
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
    if (result.error && result.error.status === HTTP_STATUS.FORBIDDEN) {
        const refreshResult = await baseQuery(
            { url: API_URLS.REFRESH_TOKEN, method: HTTP_METHODS.GET, credentials: 'include' },
            api,
            extraOptions,
        );
        if (refreshResult.meta) {
            const token = refreshResult.meta.response?.headers.get('authentication-access');
            if (token) {
                localStorage.setItem(TOKEN_KEY, token);
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
            query: () => API_URLS.MEASURE_UNITS,
            keepUnusedDataFor: Infinity,
        }),
        uploadImage: builder.mutation<ImageUploadResponse, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: API_URLS.FILE_UPLOAD,
                    method: HTTP_METHODS.POST,
                    body: formData,
                };
            },
        }),
    }),
});

export const { useGetMeasureUnitsQuery, useUploadImageMutation } = yeedaaApi;
