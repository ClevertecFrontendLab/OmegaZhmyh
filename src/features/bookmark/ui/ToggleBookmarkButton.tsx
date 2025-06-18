import { Button } from '@chakra-ui/react';

import { BsBookmarkHeart } from '~/shared/ui/icon';

import { useRecipeBookmark } from '../model/useRecipeBookmark';

export const ToggleBookmarkButton = ({ id }: { id: string }) => {
    const { handleBookmarkRecipe } = useRecipeBookmark({ id });

    return (
        <Button leftIcon={<BsBookmarkHeart />} onClick={handleBookmarkRecipe}>
            Убрать из сохраненных
        </Button>
    );
};
