import { Recipe } from '~/entities/recipe';
import { LoadMoreButton } from '~/shared/ui/load-more-button';
import { RecipeCardList } from '~/shared/ui/recipe-card-list';

type RecipeCardBoxProps = {
    recipes: Recipe[];
    showMoreRecipes: boolean;
    handleShowMoreRecipes: () => void;
    isFetchingRecipes: boolean;
};

export const RecipeCardBox = ({
    recipes,
    showMoreRecipes,
    handleShowMoreRecipes,
    isFetchingRecipes,
}: RecipeCardBoxProps) => (
    <>
        <RecipeCardList
            recipes={recipes}
            mt={{ base: '24px', md: '16px', lg: '40px', xl: '56px' }}
            columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
            rowGap={{ base: '12px', md: '16px' }}
            columnGap={{ base: '16px', xl: '24px' }}
            dataTestId='recipe-card-list'
        />
        {!showMoreRecipes && (
            <LoadMoreButton handleLoadMore={handleShowMoreRecipes} isFetching={isFetchingRecipes} />
        )}
    </>
);
