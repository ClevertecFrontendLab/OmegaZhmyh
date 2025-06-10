import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import {
    CookingBlog,
    useGetAllBloggersQuery,
    useGetBloggerByIdQuery,
} from '~/entities/cooking-blog';
import { useGetRecipeByUserIdQuery } from '~/entities/recipe/api/recipeApi';
import { UserCard } from '~/entities/user';
import { selectUserId } from '~/features/auth';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { SubscribeButton } from '~/features/supscription';
import { SERVER_ERROR_MESSAGES } from '~/shared/config/form-messages.constants';
import { HTTP_STATUS } from '~/shared/config/http-status-codes.constants';
import { ROUTES } from '~/shared/config/routes.constants';
import { useAppSelector } from '~/shared/store/hooks';
import { useErrorAlert } from '~/shared/ui/alert';
import { LoadMoreButton } from '~/shared/ui/load-more-button';
import { RecipeCardList } from '~/shared/ui/recipe-card-list';
import { NoteList } from '~/widgets/notes';

import { BloggerProfileHeader } from './BloggerProfileHeader';

const BLOG_RECIPES_LIMIT = 8;

export const BloggerProfilePage = () => {
    const navigate = useNavigate();
    const { bloggerId } = useParams();
    const { handleError } = useErrorAlert();
    const currentUserId = useAppSelector(selectUserId);

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

    const {
        data: recipesByBlogger,
        error: recipesByBloggerError,
        isFetching: isFetchingRecipes,
    } = useGetRecipeByUserIdQuery(bloggerId as string, { skip: !bloggerId });

    const [showMoreRecipes, setShowMoreRecipes] = useState(false);

    const { data: otherBlogs } = useGetAllBloggersQuery(
        {
            currentUserId: currentUserId as string,
            limit: '',
        },
        { skip: !currentUserId },
    );

    const handleShowMoreRecipes = () => {
        setShowMoreRecipes(true);
    };

    const { bloggerInfo, isFavorite } = bloggerData ?? {};
    const { _id = '' } = bloggerInfo ?? {};

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
    }, [bloggerByIdError]);

    useEffect(() => {
        if (recipesByBloggerError && isErrorResponse(recipesByBloggerError)) {
            if (recipesByBloggerError.status === HTTP_STATUS.NOT_FOUND) {
                navigate(ROUTES.NOT_FOUND);
            } else {
                handleError({
                    errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                    errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE_DOT,
                });
            }
        }
    }, [recipesByBloggerError]);

    return (
        <Box py='16px'>
            {isSuccessBloggerById && (
                <BloggerProfileHeader
                    userName={`${bloggerData?.bloggerInfo?.firstName ?? ''} ${bloggerData?.bloggerInfo?.lastName ?? ''}`}
                    accountName={`@${bloggerData?.bloggerInfo?.login ?? ''}`}
                    bookmarksCount={bloggerData?.totalBookmarks || 0}
                    subscribersCount={bloggerData?.totalSubscribers || 0}
                    action={
                        <SubscribeButton
                            fromUserId={currentUserId as string}
                            toUserId={_id}
                            isFavorite={!!isFavorite}
                        />
                    }
                />
            )}
            <RecipeCardList
                recipes={recipesByBlogger?.recipes?.slice(
                    0,
                    showMoreRecipes ? undefined : BLOG_RECIPES_LIMIT,
                )}
                mt={{ base: '24px', md: '16px', lg: '40px', xl: '56px' }}
                columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                rowGap={{ base: '12px', md: '16px' }}
                columnGap={{ base: '16px', xl: '24px' }}
                dataTestId='recipe-card-list'
            />
            {!showMoreRecipes && (
                <LoadMoreButton
                    handleLoadMore={handleShowMoreRecipes}
                    isFetching={isFetchingRecipes}
                />
            )}
            {bloggerData?.bloggerInfo?.notes?.length && (
                <NoteList limit={3} notes={bloggerData?.bloggerInfo?.notes ?? []} />
            )}
            <Flex
                justifyContent='space-between'
                alignItems='center'
                mt={{ base: '32px', lg: '64px' }}
            >
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
                {otherBlogs?.others?.map((blog) => (
                    <CookingBlog
                        key={blog._id}
                        {...blog}
                        user={
                            <UserCard
                                userName={`${blog.firstName} ${blog.lastName}`}
                                accountName={blog.login}
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
        </Box>
    );
};
