import { Button } from '@chakra-ui/react';

import { BUTTON_VARIANT } from '~/shared/config';
import { BsBookmarkHeart } from '~/shared/ui/icon';

import { useRecipeBookmark } from '../model/useRecipeBookmark';

export const ToggleBookmarkButton = ({ id }: { id: string }) => {
    const { handleBookmarkRecipe } = useRecipeBookmark({ id });

    return (
        <Button
            leftIcon={<BsBookmarkHeart />}
            variant={BUTTON_VARIANT.WHITE_OUTLINE}
            onClick={handleBookmarkRecipe}
        >
            Убрать из сохраненных
        </Button>
    );
};
