import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetAllBloggersQuery } from '~/entities/cooking-blog';
import { selectUserId } from '~/features/auth';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { SERVER_ERROR_MESSAGES } from '~/shared/config/form-messages.constants';
import { HTTP_STATUS } from '~/shared/config/http-status-codes.constants';
import { ROUTES } from '~/shared/config/routes.constants';
import { useAppSelector } from '~/shared/store/hooks';
import { useErrorAlert } from '~/shared/ui/alert';
import { FavoriteBlogs } from '~/widgets/favorite-blogs';
import { OtherBlogs } from '~/widgets/other-blogs';

export const BlogsPage = () => {
    const navigate = useNavigate();
    const currentUserId = useAppSelector(selectUserId);

    const [isShowMoreOtherBlogs, setIsShowMoreOtherBlogs] = useState(false);

    const { data, error } = useGetAllBloggersQuery({
        currentUserId: currentUserId ?? '',
        limit: isShowMoreOtherBlogs ? 'all' : 9,
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
    }, [error]);

    return (
        <div>
            <Heading
                fontSize={{ base: '2xl', lg: '5xl' }}
                textAlign='center'
                mt={{ base: '16px', lg: '32px' }}
            >
                Кулинарные блоги
            </Heading>
            <FavoriteBlogs blogers={favoriteBlogs} mt='24px' />
            <OtherBlogs
                blogers={otherBlogs}
                setShowMore={setIsShowMoreOtherBlogs}
                isShowMore={isShowMoreOtherBlogs}
                mt={{ base: '32px', lg: '40px' }}
            />
        </div>
    );
};
