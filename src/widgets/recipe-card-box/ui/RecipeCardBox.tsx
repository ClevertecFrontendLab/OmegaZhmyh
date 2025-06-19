import { useState } from 'react';

import { BLOG_RECIPES_LIMIT } from '~/shared/config';
import { CardSimpleGrid } from '~/shared/ui/cards-simple-grid';
import { LoadMoreButton } from '~/shared/ui/load-more-button';

type RecipeCardBoxProps = {
    isFetchingRecipes: boolean;
    cards: React.ReactNode[];
    mt?: string | { base: string; md: string; lg: string; xl: string };
};

export const RecipeCardBox = ({ cards = [], isFetchingRecipes, mt }: RecipeCardBoxProps) => {
    const [showMoreRecipes, setShowMoreRecipes] = useState(false);

    const handleShowMoreRecipes = () => {
        setShowMoreRecipes(true);
    };

    const paginatedCards = [...cards].slice(0, showMoreRecipes ? undefined : BLOG_RECIPES_LIMIT);

    return (
        <>
            <CardSimpleGrid mt={mt}>{paginatedCards}</CardSimpleGrid>
            {!showMoreRecipes && cards.length > BLOG_RECIPES_LIMIT && (
                <LoadMoreButton
                    handleLoadMore={handleShowMoreRecipes}
                    isFetching={isFetchingRecipes}
                />
            )}
        </>
    );
};
