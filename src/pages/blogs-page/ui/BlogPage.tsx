import { Box, Heading } from '@chakra-ui/react';

import { FavoriteBlogs } from '~/widgets/favorite-blogs';
import { NewRecipes } from '~/widgets/new-recipes';
import { OtherBlogs } from '~/widgets/other-blogs';

import { useBlogsPage } from '../model/useBlogsPage';

export const BlogsPage = () => {
    const { favoriteBlogs, otherBlogs, isShowMoreOtherBlogs, setIsShowMoreOtherBlogs } =
        useBlogsPage();

    return (
        <Box pt={{ base: '16px', lg: '32px' }} pb={{ base: '16px', lg: '0' }}>
            <Heading fontSize={{ base: '2xl', lg: '5xl' }} textAlign='center'>
                Кулинарные блоги
            </Heading>
            <FavoriteBlogs blogers={favoriteBlogs} mt='24px' />
            <OtherBlogs
                blogers={otherBlogs}
                setShowMore={setIsShowMoreOtherBlogs}
                isShowMore={isShowMoreOtherBlogs}
                mt={{ base: '32px', lg: '40px' }}
            />
            <NewRecipes mt={{ base: '12px', md: '32px', lg: '40px' }} />
        </Box>
    );
};
