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
import { BloggerProfileHeader } from '~/widgets/blogger-profile-header';
import { NoteList } from '~/widgets/notes';

const BLOG_RECIPES_LIMIT = 8;

export const BloggerProfilePage = () => {
    const navigate = useNavigate();
    const { bloggerId = '' } = useParams();
    const { handleError } = useErrorAlert();
    const currentUserId = useAppSelector(selectUserId) ?? '';

    const { data: blogger, error: bloggerByIdError } = useGetBloggerByIdQuery(
        {
            bloggerId,
            currentUserId,
        },
        { skip: !bloggerId || !currentUserId },
    );

    const {
        data: recipesByBlogger,
        error: recipesByBloggerError,
        isFetching: isFetchingRecipes,
    } = useGetRecipeByUserIdQuery(bloggerId);

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

    const { bloggerInfo, isFavorite } = blogger ?? {};
    const { _id = '' } = bloggerInfo ?? {};

    useEffect(() => {
        if (bloggerByIdError && isErrorResponse(bloggerByIdError)) {
            if (bloggerByIdError.status === HTTP_STATUS.NOT_FOUND) {
                navigate(ROUTES.NOT_FOUND);
            } else {
                handleError({
                    errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                    errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE,
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
                    errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE,
                });
            }
        }
    }, [recipesByBloggerError]);

    return (
        <Box py='16px'>
            <BloggerProfileHeader
                userName={`${blogger?.bloggerInfo?.firstName ?? ''} ${blogger?.bloggerInfo?.lastName ?? ''}`}
                accountName={`@${blogger?.bloggerInfo?.login ?? ''}`}
                bookmarksCount={blogger?.totalBookmarks || 0}
                subscribersCount={blogger?.totalSubscribers || 0}
                action={
                    <SubscribeButton
                        fromUserId={currentUserId}
                        toUserId={_id}
                        isFavorite={isFavorite ?? false}
                    />
                }
            />
            <RecipeCardList
                recipes={recipesByBlogger?.recipes?.slice(
                    0,
                    showMoreRecipes ? undefined : BLOG_RECIPES_LIMIT,
                )}
                dataTestId='recipe-card-list'
            />
            {!showMoreRecipes && (
                <LoadMoreButton
                    handleLoadMore={handleShowMoreRecipes}
                    isFetching={isFetchingRecipes}
                />
            )}
            <NoteList limit={3} notes={blogger?.bloggerInfo?.notes ?? []} />
            <Flex justifyContent='space-between' alignItems='center'>
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
                    Все авторы
                </Button>
            </Flex>
            <Grid
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
                    />
                ))}
            </Grid>
        </Box>
    );
};
