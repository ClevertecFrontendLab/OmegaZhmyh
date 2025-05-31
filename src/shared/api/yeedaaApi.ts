import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCategories } from '~/entities/Category/model/slice';
import { SubCategory } from '~/entities/Category/types';
import { MainCategory } from '~/entities/Category/types';

import { API_BASE_URL } from '../config/api-urls.constants';
import { setCategoriesLoading } from '../store/app-slice';
import { ApplicationState } from '../store/configure-store';
import { CategoriesResponse, ImageUploadResponse, MeasureUnit } from './types';

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

    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => '/category',
            keepUnusedDataFor: Infinity,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setCategoriesLoading(true));
                    const { data } = await queryFulfilled;
                    if (Array.isArray(data)) {
                        dispatch(setCategories(data));
                    }
                } finally {
                    dispatch(setCategoriesLoading(false));
                }
            },
        }),
        getCategoryById: builder.query<MainCategory | SubCategory, string>({
            query: (id) => `/category/${id}`,
        }),
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

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetMeasureUnitsQuery,
    useUploadImageMutation,
} = yeedaaApi;
