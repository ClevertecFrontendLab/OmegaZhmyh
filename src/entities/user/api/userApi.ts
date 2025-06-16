import { Bloger } from '~/entities/cooking-blog';
import { yeedaaApi } from '~/shared/api';
import { API_URLS } from '~/shared/config';

export const userApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<Bloger, void>({
            query: () => `${API_URLS.USERS.MY}`,
        }),
    }),
});

export const { useGetUserQuery } = userApi;
