import { TAG_TYPES, yeedaaApi } from '~/shared/api';
import { API_URLS } from '~/shared/config';

import {
    AllBlogersRequest,
    AllBlogersResponse,
    BlogerByIdRequest,
    BloggerByIdResponse,
} from '../model/blog.types';

export const blogApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBloggers: builder.query<AllBlogersResponse, AllBlogersRequest>({
            query: ({ limit, currentUserId }) => ({
                url: API_URLS.BLOGGERS,
                params: { currentUserId, limit },
            }),
            providesTags: [TAG_TYPES.SUBSCRIPTION],
        }),
        getBloggerById: builder.query<BloggerByIdResponse, BlogerByIdRequest>({
            query: ({ bloggerId, currentUserId }) => ({
                url: `${API_URLS.BLOGGERS}/${bloggerId}`,
                params: {
                    currentUserId,
                },
            }),
            providesTags: [TAG_TYPES.SUBSCRIPTION],
        }),
    }),
});

export const { useGetAllBloggersQuery, useGetBloggerByIdQuery } = blogApi;
