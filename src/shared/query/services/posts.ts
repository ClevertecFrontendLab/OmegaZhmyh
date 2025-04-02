import { ApiEndpoints } from '~/shared/query/constants/api.ts';
import { ApiGroupNames } from '~/shared/query/constants/api-group-names.ts';
import { EndpointNames } from '~/shared/query/constants/endpoint-names.ts';
import { Tags } from '~/shared/query/constants/tags.ts';
import { apiSlice } from '~/shared/query/create-api.ts';

export const postsApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.POSTS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getPosts: builder.query<void, void>({
                query: () => ({
                    url: ApiEndpoints.POSTS,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.POSTS,
                    name: EndpointNames.GET_POSTS,
                }),
                providesTags: [Tags.POSTS],
            }),
        }),
    });

export const { useGetPostsQuery } = postsApiSlice;
