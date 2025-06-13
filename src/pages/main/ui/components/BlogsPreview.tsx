import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, Text, useBreakpointValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router';

import { CookingBlogPreview, useGetAllBloggersQuery } from '~/entities/cooking-blog';
import { UserCard } from '~/entities/user';
import { selectUserId } from '~/features/auth';
import { ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useAppSelector } from '~/shared/store/hooks';
import { useErrorAlert } from '~/shared/ui/alert';

const PREVIEW_BLOGS_LIMIT = 3;

export const BlogsPreview = () => {
    const currentUserId = useAppSelector(selectUserId);

    const {
        data: blogs,
        isError,
        isLoading,
    } = useGetAllBloggersQuery({
        limit: '',
        currentUserId: currentUserId as string,
    });

    const allBlogs = [...(blogs?.favorites || []), ...(blogs?.others || [])];
    const previewBlogs = allBlogs.slice(0, PREVIEW_BLOGS_LIMIT);

    const isDesktop = useBreakpointValue({ base: false, lg: true });
    const { handleError } = useErrorAlert();

    useEffect(() => {
        if (isError) {
            handleError({
                errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE_DOT,
            });
        }
    }, [handleError, isError]);

    return isError || isLoading ? null : (
        <Box
            bgColor='lime.300'
            padding={{ base: '12px', lg: '24px' }}
            marginTop={{ base: '32px', lg: '40px' }}
            borderRadius={16}
            data-test-id='main-page-blogs-box'
        >
            <Flex justifyContent='space-between'>
                <Text
                    fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}
                    fontWeight={{ base: 'medium', xl: 'normal' }}
                    lineHeight='32px'
                >
                    Кулинарные блоги
                </Text>
                {isDesktop && (
                    <Button
                        as={Link}
                        to={ROUTES.BLOGS}
                        rightIcon={<ArrowForwardIcon />}
                        variant='ghost'
                        fontSize='xl'
                        fontWeight='semibold'
                        _hover={{ bgColor: 'lime.50' }}
                        data-test-id='main-page-blogs-button'
                    >
                        Все авторы
                    </Button>
                )}
            </Flex>
            <Grid
                gap={{ base: '12px', lg: '16px' }}
                marginTop={{ base: '12px', lg: '16px', xl: '24px' }}
                templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
                data-test-id='main-page-blogs-grid'
            >
                {previewBlogs.map((blog) => (
                    <CookingBlogPreview
                        key={blog._id}
                        text={blog.notes?.[0]?.text ?? ''}
                        user={
                            <UserCard
                                firstName={blog.firstName ?? 'Имя'}
                                lastName={blog.lastName ?? 'Фамилия'}
                                login={blog.login ?? 'Логин'}
                            />
                        }
                    />
                ))}
            </Grid>
            {!isDesktop && (
                <Button
                    as={Link}
                    to={ROUTES.BLOGS}
                    display='flex'
                    margin={{ base: '12px auto 0 auto' }}
                    rightIcon={<ArrowForwardIcon />}
                    variant='ghost'
                    fontSize='xl'
                    fontWeight='semibold'
                    _hover={{ bgColor: 'lime:50' }}
                    data-test-id='main-page-blogs-button'
                >
                    Все авторы
                </Button>
            )}
        </Box>
    );
};
