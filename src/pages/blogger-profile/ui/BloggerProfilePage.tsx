import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

import { selectUserId } from '~/features/auth';
import { SubscribeButton } from '~/features/supscription';
import { BLOG_NOTES_ANCHOR, BLOG_NOTES_LIMIT } from '~/shared/config';
import { setPageLoader } from '~/shared/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import { RecipeCardBox } from '~/widgets/recipe-card-box';

import { useBloggerData } from '../model/useBloggerData';
import { useOtherBlogs } from '../model/useOtherBlogs';
import { useRecipeData } from '../model/useRecipeData';
import { BloggerProfileHeader } from './components/BloggerProfileHeader';
import { BlogNotesBox } from './components/BlogNotesBox';
import { OtherBlogsGrid } from './components/OtherBlogsGrid';

export const BloggerProfilePage = () => {
    const { bloggerId } = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector(selectUserId);

    const { recipesByBlogger, isFetchingRecipes } = useRecipeData(bloggerId as string);
    const { otherBlogs, isLoadingBlogs } = useOtherBlogs(currentUserId as string);
    const {
        isSuccessBloggerById,
        userName,
        accountName,
        bookmarksCount,
        subscribersCount,
        notes,
        isFavorite,
        toUserId,
        isLoadingBloggerById,
    } = useBloggerData(bloggerId as string, currentUserId as string);

    const isLoading = isLoadingBloggerById || isLoadingBlogs;

    useEffect(() => {
        dispatch(setPageLoader(isLoading));
        return () => {
            dispatch(setPageLoader(false));
        };
    }, [isLoading, dispatch]);

    useEffect(() => {
        if (location.hash === `#${BLOG_NOTES_ANCHOR}`) {
            const notesElement = document.getElementById(BLOG_NOTES_ANCHOR);
            if (notesElement) {
                notesElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash]);

    return (
        <Box py='16px'>
            {isSuccessBloggerById && (
                <BloggerProfileHeader
                    userName={userName}
                    accountName={accountName}
                    bookmarksCount={bookmarksCount}
                    subscribersCount={subscribersCount}
                    action={
                        <SubscribeButton
                            fromUserId={currentUserId as string}
                            toUserId={toUserId}
                            isFavorite={isFavorite}
                        />
                    }
                />
            )}
            <RecipeCardBox recipes={recipesByBlogger} isFetchingRecipes={isFetchingRecipes} />
            <BlogNotesBox limit={BLOG_NOTES_LIMIT} notes={notes} />
            <OtherBlogsGrid otherBlogs={otherBlogs} currentUserId={currentUserId as string} />
        </Box>
    );
};
