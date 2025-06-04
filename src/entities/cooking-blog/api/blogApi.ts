import { TAG_TYPES, yeedaaApi } from '~/shared/api/yeedaaApi';

import { Bloger } from '../model/types';

export type AllBlogersResponse = Partial<{
    favorites: Bloger[];
    others: Bloger[];
}>;

type AllBlogersRequest = {
    limit: number;
    currentUserId: string;
};

type BlogerByIdRequest = {
    bloggerId: string;
    currentUserId: string;
};

export const blogApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBloggers: builder.query<AllBlogersResponse, AllBlogersRequest>({
            query: ({ limit, currentUserId }) => ({
                url: '/bloggers',
                params: { limit, currentUserId },
            }),
            providesTags: [TAG_TYPES.SUBSCRIPTION],
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
