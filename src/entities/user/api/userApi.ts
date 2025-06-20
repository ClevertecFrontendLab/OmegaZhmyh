import { Note } from '~/entities/cooking-blog/model/blog.types';
import { Recipe } from '~/entities/recipe/@x/cooking-blog';
import { TAG_TYPES, yeedaaApi } from '~/shared/api';
import { API_URLS, HTTP_METHODS } from '~/shared/config';

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
            providesTags: [TAG_TYPES.USER_INFO],
        }),
        addNote: builder.mutation<Note, { text: string }>({
            query: ({ text }) => ({
                url: API_URLS.USERS.NOTE,
                method: HTTP_METHODS.POST,
                body: { text },
            }),
            invalidatesTags: [TAG_TYPES.USER_INFO],
        }),
        deleteNote: builder.mutation<Note, { id: string }>({
            query: ({ id }) => ({
                url: `${API_URLS.USERS.NOTE}/${id}`,
                method: HTTP_METHODS.DELETE,
            }),
            invalidatesTags: [TAG_TYPES.USER_INFO],
        }),
        uploadAvatar: builder.mutation<{ photoLink: string }, FormData>({
            query: (formData) => ({
                url: API_URLS.USERS.AVATAR,
                method: HTTP_METHODS.POST,
                body: formData,
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useAddNoteMutation,
    useDeleteNoteMutation,
    useUploadAvatarMutation,
} = userApi;
