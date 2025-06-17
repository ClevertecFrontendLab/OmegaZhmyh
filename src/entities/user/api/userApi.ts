import { Note } from '~/entities/cooking-blog/model/blog.types';
import { Recipe } from '~/entities/recipe/@x/cooking-blog';
import { yeedaaApi } from '~/shared/api';
import { API_URLS } from '~/shared/config';

type UserResponse = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: Recipe[];
    subscriptions: string[];
    subscribers: string[];
    notes: Note[];
};

export const userApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, void>({
            query: () => `${API_URLS.USERS.MY}`,
        }),
    }),
});

export const { useGetUserQuery } = userApi;
