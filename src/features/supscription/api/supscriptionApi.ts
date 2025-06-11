import { TAG_TYPES, yeedaaApi } from '~/shared/api/yeedaaApi';
import { API_URLS } from '~/shared/config/api.constants';
import { HTTP_METHODS } from '~/shared/config/http-methods.constants';

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
                url: API_URLS.TOGGLE_SUBSCRIPTION,
                method: HTTP_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [TAG_TYPES.SUBSCRIPTION],
        }),
    }),
});

export const { useGetSupscriptionMutation } = supscriptionApi;
