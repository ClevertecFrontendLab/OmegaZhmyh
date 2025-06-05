import { yeedaaApi } from '~/shared/api/yeedaaApi';
import { setCategoriesLoading } from '~/shared/store/app-slice';

import { setCategories } from '../model/slice';
import { CategoriesResponse } from '../types';

export const categoryApi = yeedaaApi.injectEndpoints({
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
        getCategoryById: builder.query<CategoriesResponse, string>({
            query: (id) => `/category/${id}`,
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
