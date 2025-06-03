import { Heading } from '@chakra-ui/react';

import { useGetAllBloggersQuery } from '~/entities/cooking-blog';
import { selectUserId } from '~/features/auth';
import { useAppSelector } from '~/shared/store/hooks';
import { FavoriteBlogs } from '~/widgets/favorite-blogs';
import { OtherBlogs } from '~/widgets/other-blogs';

export const BlogPage = () => {
    const currentUserId = useAppSelector(selectUserId);
    const { data } = useGetAllBloggersQuery({
        limit: 10,
        currentUserId: currentUserId ?? '',
    });

    const otherBlogs = data?.others || [];

    return (
        <div>
            <Heading
                fontSize={{ base: '2xl', lg: '5xl' }}
                textAlign='center'
                mt={{ base: '16px', lg: '32px' }}
            >
                Кулинарные блоги
            </Heading>
            <FavoriteBlogs blogers={otherBlogs} mt='24px' />
            <OtherBlogs blogers={otherBlogs} mt={{ base: '32px', lg: '40px' }} />
        </div>
    );
};
