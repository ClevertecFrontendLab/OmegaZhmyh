import { TAG_TYPES, yeedaaApi } from '~/shared/api/yeedaaApi';

export type SupscriptionRequest = {
    fromUserId: string;
    toUserId: string;
};

type SupscriptionResponse = {
    message: string;
};

export const supscriptionApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        getSupscription: builder.mutation<SupscriptionResponse, SupscriptionRequest>({
            query: (data) => ({
                url: '/users/toggle-subscription',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: [TAG_TYPES.SUBSCRIPTION],
        }),
    }),
});

export const { useGetSupscriptionMutation } = supscriptionApi;
