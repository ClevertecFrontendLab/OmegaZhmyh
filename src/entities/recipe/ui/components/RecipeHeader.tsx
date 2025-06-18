import { HStack } from '@chakra-ui/react';

import { BookmarkBtn, LikeBtn } from '~/shared/ui/mini-buttons';
import { RecipeTags } from '~/shared/ui/recipe-tags';

type RecipeHeaderProps = {
    categoriesIds: string[];
    bookmarks: number;
    likes: number;
};

export const RecipeHeader = ({ categoriesIds, bookmarks, likes }: RecipeHeaderProps) => (
    <HStack spacing={8.5} justifyContent='space-between'>
        <RecipeTags
            categoriesIds={categoriesIds}
            bgColor='lime.50'
            display={{ lg: 'flex', base: 'none' }}
        />
        <HStack spacing={2}>
            <BookmarkBtn value={bookmarks} />
            <LikeBtn value={likes} />
        </HStack>
    </HStack>
);
