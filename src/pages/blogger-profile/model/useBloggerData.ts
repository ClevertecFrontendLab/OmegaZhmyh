import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useGetBloggerByIdQuery } from '~/entities/cooking-blog';
import { isErrorResponse } from '~/features/auth/';
import { HTTP_STATUS, ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

export const useBloggerData = (bloggerId: string, currentUserId: string) => {
    const navigate = useNavigate();
    const { handleError } = useErrorAlert();

    const {
        data: bloggerData,
        error: bloggerByIdError,
        isSuccess: isSuccessBloggerById,
    } = useGetBloggerByIdQuery(
        {
            bloggerId: bloggerId as string,
            currentUserId: currentUserId as string,
        },
        { skip: !bloggerId || !currentUserId },
    );

    useEffect(() => {
        if (bloggerByIdError && isErrorResponse(bloggerByIdError)) {
            if (bloggerByIdError.status === HTTP_STATUS.NOT_FOUND) {
                navigate(ROUTES.NOT_FOUND);
            } else {
                navigate(ROUTES.HOME);
                handleError({
                    errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                    errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE_DOT,
                });
            }
        }
    }, [bloggerByIdError, handleError, navigate]);

    const subscribersCount = bloggerData?.totalSubscribers || 0;
    const bookmarksCount = bloggerData?.totalBookmarks || 0;
    const accountName = `@${bloggerData?.bloggerInfo?.login ?? ''}`;
    const userName = `${bloggerData?.bloggerInfo?.firstName ?? ''} ${bloggerData?.bloggerInfo?.lastName ?? ''}`;
    const notes = bloggerData?.bloggerInfo?.notes ?? [];
    const isFavorite = bloggerData?.isFavorite ?? false;
    const toUserId = bloggerData?.bloggerInfo?._id ?? '';

    return {
        subscribersCount,
        bookmarksCount,
        accountName,
        userName,
        notes,
        isFavorite,
        toUserId,
        isSuccessBloggerById,
    };
};
