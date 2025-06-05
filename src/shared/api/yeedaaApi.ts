import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const yeedaaApi = createApi({
    reducerPath: 'yeedaaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as ApplicationState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
