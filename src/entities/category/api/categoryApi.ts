import { yeedaaApi } from '~/shared/api/yeedaaApi';
import { API_URLS } from '~/shared/config';
import { setCategoriesLoading } from '~/shared/store/app-slice';

import { CategoriesResponse } from '../model/category.types';
import { setCategories } from '../model/slice';

export const categoryApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => API_URLS.CATEGORIES,
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
            query: (id) => `${API_URLS.CATEGORIES}/${id}`,
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
