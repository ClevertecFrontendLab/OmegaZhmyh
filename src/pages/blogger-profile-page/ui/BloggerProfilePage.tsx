import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useGetBloggerByIdQuery } from '~/entities/cooking-blog';
import { useGetRecipeByUserIdQuery } from '~/entities/recipe/api/recipeApi';
import { selectUserId } from '~/features/auth';
import { SubscribeButton } from '~/features/supscription';
import { useAppSelector } from '~/shared/store/hooks';
import { RecipeCardList } from '~/shared/ui/recipe-card-list';
import { BloggerProfileHeader } from '~/widgets/blogger-profile-header';

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

    const { _id = '' } = blogger ?? {};
    return (
        <Box py='16px'>
            <BloggerProfileHeader
                imgUrl='https://via.placeholder.com/150'
                userName='John Doe'
                accountName='@john_doe'
                bookmarksCount={100}
                subscribersCount={1000}
                action={<SubscribeButton fromUserId={currentUserId} toUserId={_id} />}
            />
            <RecipeCardList recipes={recipesByBlogger?.recipes} />
        </Box>
    );
};
