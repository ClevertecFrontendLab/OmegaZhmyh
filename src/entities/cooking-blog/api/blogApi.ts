import { TAG_TYPES, yeedaaApi } from '~/shared/api/yeedaaApi';

import {
    AllBlogersRequest,
    AllBlogersResponse,
    BlogerByIdRequest,
    BloggerByIdResponse,
} from '../types';

export const blogApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBloggers: builder.query<AllBlogersResponse, AllBlogersRequest>({
            query: ({ limit, currentUserId }) => ({
                url: '/bloggers',
                params: { limit, currentUserId },
            }),
            providesTags: [TAG_TYPES.SUBSCRIPTION],
        }),
        getBloggerById: builder.query<BloggerByIdResponse, BlogerByIdRequest>({
            query: ({ bloggerId, currentUserId }) => ({
                url: `/bloggers/${bloggerId}`,
                params: {
                    bloggerId,
                    currentUserId,
                },
            }),
            providesTags: [TAG_TYPES.SUBSCRIPTION],
        }),
    }),
});

export const { useGetAllBloggersQuery, useGetBloggerByIdQuery } = blogApi;
