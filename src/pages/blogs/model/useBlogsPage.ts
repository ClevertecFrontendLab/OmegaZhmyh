import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetAllBloggersQuery } from '~/entities/cooking-blog';
import { selectUserId } from '~/features/auth';
import { isErrorResponse } from '~/features/auth/';
import { BLOG_LIMIT, HTTP_STATUS, ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useAppSelector } from '~/shared/store/hooks';
import { useErrorAlert } from '~/shared/ui/alert';

export const useBlogsPage = () => {
    const navigate = useNavigate();
    const currentUserId = useAppSelector(selectUserId);

    const [isShowMoreOtherBlogs, setIsShowMoreOtherBlogs] = useState(false);

    const { data, error } = useGetAllBloggersQuery({
        currentUserId: currentUserId ?? '',
        limit: isShowMoreOtherBlogs ? 'all' : BLOG_LIMIT,
    });
    const { handleError } = useErrorAlert();

    const favoriteBlogs = data?.favorites || [];
    const otherBlogs = data?.others || [];

    useEffect(() => {
        if (error && isErrorResponse(error)) {
            if (error.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                handleError({
                    errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                    errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE_DOT,
                });
                navigate(ROUTES.HOME);
            }
        }
    }, [error, handleError, navigate]);

    return { favoriteBlogs, otherBlogs, isShowMoreOtherBlogs, setIsShowMoreOtherBlogs };
};
