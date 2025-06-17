import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { DraftCard, RecipeCard } from '~/entities/recipe';
import { Recipe, RecipeResponseByUser } from '~/entities/recipe/model/recipe.types';
import { BLOG_RECIPES_LIMIT } from '~/shared/config';
import { CardSimpleGrid } from '~/shared/ui/cards-simple-grid';
import { LoadMoreButton } from '~/shared/ui/load-more-button';

type RecipeCardBoxProps = {
    isFetchingRecipes: boolean;
    recipes?: RecipeResponseByUser;
    drafts?: Recipe[];
};

export const RecipeCardBox = ({ recipes, drafts, isFetchingRecipes }: RecipeCardBoxProps) => {
    const [showMoreRecipes, setShowMoreRecipes] = useState(false);

    const handleShowMoreRecipes = () => {
        setShowMoreRecipes(true);
    };

    const recipesCards =
        recipes?.recipes?.map((recipe, i) => (
            <Box key={recipe._id} data-test-id={`food-card-${i}`}>
                <RecipeCard recipe={recipe} cardLinkId={i} />
            </Box>
        )) || [];

    const draftsCards =
        drafts?.map((draft) => (
            <Box key={draft._id}>
                <DraftCard
                    title={draft.title}
                    description={draft.description}
                    image={draft.image}
                />
            </Box>
        )) || [];

    const paginatedCards = [...draftsCards, ...recipesCards].slice(
        0,
        showMoreRecipes ? undefined : BLOG_RECIPES_LIMIT,
    );

    return (
        <>
            <CardSimpleGrid>{paginatedCards}</CardSimpleGrid>
            {!showMoreRecipes && (
                <LoadMoreButton
                    handleLoadMore={handleShowMoreRecipes}
                    isFetching={isFetchingRecipes}
                />
            )}
        </>
    );
};
