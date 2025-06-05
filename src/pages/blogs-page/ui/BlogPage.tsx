import { Button, Heading } from '@chakra-ui/react';

import { useGetAllBloggersQuery } from '~/entities/cooking-blog';
import { selectUserId } from '~/features/auth';
import { useRefreshTokenMutation } from '~/features/auth/api/authApi';
import { useAppSelector } from '~/shared/store/hooks';
import { FavoriteBlogs } from '~/widgets/favorite-blogs';
import { OtherBlogs } from '~/widgets/other-blogs';

export const BlogsPage = () => {
    const currentUserId = useAppSelector(selectUserId);
    const { data } = useGetAllBloggersQuery({
        limit: 10,
        currentUserId: currentUserId ?? '',
    });

    const [refreshToken] = useRefreshTokenMutation();

    const favoriteBlogs = data?.favorites || [];
    const otherBlogs = data?.others || [];

    return (
        <div>
            <Button onClick={() => refreshToken()}>Refresh</Button>
            <Heading
                fontSize={{ base: '2xl', lg: '5xl' }}
                textAlign='center'
                mt={{ base: '16px', lg: '32px' }}
            >
                Кулинарные блоги
            </Heading>
            <FavoriteBlogs blogers={favoriteBlogs} mt='24px' />
            <OtherBlogs blogers={otherBlogs} mt={{ base: '32px', lg: '40px' }} />
        </div>
    );
};
