import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '~/shared/config/api-urls.constants';
import { ApplicationState } from '~/shared/store/configure-store';

type Note = {
    date: string;
    text: string;
};

type Bloger = {
    bookmarksCount: number;
    firstName: string;
    isFavorite: boolean;
    lastName: string;
    login: string;
    newRecipesCount: number;
    notes: Note[];
    subscribersCount: number;
    _id: string;
};

type AllBlogersResponse = {
    favorite: Bloger[];
    others: Bloger[];
};

type AllBlogersRequest = {
    limit: number;
    currentUserId: string;
};

type BlogerByIdRequest = {
    bloggerId: string;
    currentUserId: string;
};

export const blogApi = createApi({
    reducerPath: 'blogApi',
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
        getAllBloggers: builder.query<AllBlogersResponse, AllBlogersRequest>({
            query: ({ limit, currentUserId }) => ({
                url: '/bloggers',
                params: { limit, currentUserId },
            }),
        }),
        getBloggerById: builder.query<Bloger, BlogerByIdRequest>({
            query: ({ bloggerId, currentUserId }) => ({
                url: `/bloggers/${bloggerId}`,
                params: {
                    bloggerId,
                    currentUserId,
                },
            }),
        }),
    }),
});

export const { useGetAllBloggersQuery, useGetBloggerByIdQuery } = blogApi;
