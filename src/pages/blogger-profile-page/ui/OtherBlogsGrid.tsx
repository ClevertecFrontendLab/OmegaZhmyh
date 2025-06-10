import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Grid, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { Bloger, CookingBlog } from '~/entities/cooking-blog';
import { UserCard } from '~/entities/user';
import { SubscribeButton } from '~/features/supscription';
import { ROUTES } from '~/shared/config/routes.constants';

type OtherBlogsGridProps = {
    otherBlogs: Bloger[];
    currentUserId: string;
};

export const OtherBlogsGrid = ({ otherBlogs, currentUserId }: OtherBlogsGridProps) => (
    <>
        <Flex justifyContent='space-between' alignItems='center' mt={{ base: '32px', lg: '64px' }}>
            <Text fontSize={{ base: '2xl', lg: '5xl' }} fontWeight='semibold'>
                Другие блоги
            </Text>
            <Button
                as={Link}
                to={ROUTES.BLOGS}
                variant='unstyled'
                display='flex'
                alignItems='center'
                fontSize={{ base: 'xs', lg: 'lg' }}
                fontWeight='bold'
                rightIcon={<ArrowForwardIcon />}
                data-test-id='blogger-user-other-blogs-button'
            >
                Всe авторы
            </Button>
        </Flex>
        <Grid
            mt={{ base: '16px', lg: '24px' }}
            templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
            gap={{ base: '12px', md: '16px' }}
            data-test-id='blogger-user-other-blogs-grid'
        >
            {otherBlogs.map((blog) => (
                <CookingBlog
                    key={blog._id}
                    {...blog}
                    user={
                        <UserCard
                            firstName={blog.firstName ?? 'Имя'}
                            lastName={blog.lastName ?? 'Фамилия'}
                            login={blog.login ?? 'Логин'}
                        />
                    }
                    action={
                        <SubscribeButton
                            fromUserId={currentUserId as string}
                            toUserId={blog._id as string}
                            isFavorite={!!blog.isFavorite}
                        />
                    }
                />
            ))}
        </Grid>
    </>
);
