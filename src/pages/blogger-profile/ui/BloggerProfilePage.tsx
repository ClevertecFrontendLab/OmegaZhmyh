import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { selectUserId } from '~/features/auth';
import { SubscribeButton } from '~/features/supscription';
import { useAppSelector } from '~/shared/store/hooks';

import { useBloggerData } from '../model/useBloggerData';
import { useOtherBlogs } from '../model/useOtherBlogs';
import { useRecipeData } from '../model/useRecipeData';
import { BloggerProfileHeader } from './components/BloggerProfileHeader';
import { BlogNotesBox } from './components/BlogNotesBox';
import { OtherBlogsGrid } from './components/OtherBlogsGrid';
import { RecipeCardBox } from './components/RecipeCardBox';

export const BloggerProfilePage = () => {
    const { bloggerId } = useParams();
    const currentUserId = useAppSelector(selectUserId);

    const { paginatedRecipes, isFetchingRecipes, handleShowMoreRecipes, showMoreRecipes } =
        useRecipeData(bloggerId as string);
    const { otherBlogs } = useOtherBlogs(currentUserId as string);
    const {
        isSuccessBloggerById,
        userName,
        accountName,
        bookmarksCount,
        subscribersCount,
        notes,
        isFavorite,
        toUserId,
    } = useBloggerData(bloggerId as string, currentUserId as string);

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
            <RecipeCardBox
                recipes={paginatedRecipes}
                showMoreRecipes={showMoreRecipes}
                handleShowMoreRecipes={handleShowMoreRecipes}
                isFetchingRecipes={isFetchingRecipes}
            />
            <BlogNotesBox limit={3} notes={notes} />
            <OtherBlogsGrid otherBlogs={otherBlogs} currentUserId={currentUserId as string} />
        </Box>
    );
};
