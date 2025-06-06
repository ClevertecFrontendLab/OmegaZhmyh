import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useGetBloggerByIdQuery } from '~/entities/cooking-blog';
import { useGetRecipeByUserIdQuery } from '~/entities/recipe/api/recipeApi';
import { selectUserId } from '~/features/auth';
import { SubscribeButton } from '~/features/supscription';
import { useAppSelector } from '~/shared/store/hooks';
import { RecipeCardList } from '~/shared/ui/recipe-card-list';
import { BloggerProfileHeader } from '~/widgets/blogger-profile-header';
import { NoteList } from '~/widgets/notes';

export const BloggerProfilePage = () => {
    const { bloggerId = '' } = useParams();
    const currentUserId = useAppSelector(selectUserId) ?? '';

    const { data: blogger } = useGetBloggerByIdQuery(
        {
            bloggerId,
            currentUserId,
        },
        { skip: !bloggerId || !currentUserId },
    );

    const { data: recipesByBlogger } = useGetRecipeByUserIdQuery(bloggerId);

    const { bloggerInfo, isFavorite } = blogger ?? {};
    const { _id = '' } = bloggerInfo ?? {};
    return (
        <Box py='16px'>
            <BloggerProfileHeader
                imgUrl=''
                userName='John Doe'
                accountName='@john_doe'
                bookmarksCount={100}
                subscribersCount={1000}
                action={
                    <SubscribeButton
                        fromUserId={currentUserId}
                        toUserId={_id}
                        isFavorite={isFavorite ?? false}
                    />
                }
            />
            <RecipeCardList recipes={recipesByBlogger?.recipes} />
            <NoteList limit={3} notes={blogger?.bloggerInfo?.notes ?? []} />
        </Box>
    );
};
