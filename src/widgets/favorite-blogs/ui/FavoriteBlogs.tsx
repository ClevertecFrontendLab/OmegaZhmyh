import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { CookingBlog } from '~/entities/cooking-blog';
import { useGetAllBloggersQuery } from '~/entities/cooking-blog/api/blogApi';
import { selectUserId } from '~/features/auth';
import { useAppSelector } from '~/shared/store/hooks';

export const FavoriteBlogs = () => {
    const currentUserId = useAppSelector(selectUserId);
    const { data } = useGetAllBloggersQuery({
        limit: 10,
        currentUserId: currentUserId ?? '',
    });

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    return (
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            gap={{ base: '12px', lg: '16px' }}
            bgColor='lime.300'
            borderRadius='16px'
            p={{ base: '12px', lg: '24px' }}
            alignItems='center'
        >
            <Text>Избранные блоги</Text>
            <Flex>{data?.favorite.map((blog) => <CookingBlog key={blog._id} {...blog} />)}</Flex>
        </Flex>
    );
};
