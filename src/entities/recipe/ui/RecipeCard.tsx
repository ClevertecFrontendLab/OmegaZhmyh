import { useSelector } from 'react-redux';

import { selectSearch } from '~/features/recipe-filters';
import { RecipeTags } from '~/shared/ui/recipe-tags';

import { Recipe } from '../model/recipe.types';
import { BaseCard } from './BaseCard';
import { RecipeCardActions } from './components/RecipeCardActions';
import { RecipeHeader } from './components/RecipeHeader';

export type RecipeCardProps = {
    recipe: Recipe;
    cardLinkId?: string;
    actions?: React.ReactNode;
};

export const RecipeCard = ({ recipe, cardLinkId, actions }: RecipeCardProps) => {
    const { searchQuery } = useSelector(selectSearch);
    const { bookmarks, description, _id, image, likes, categoriesIds, title } = recipe;

    return (
        <BaseCard
            description={description}
            image={image}
            title={title}
            highlightQuery={searchQuery}
            cardHeader={
                <RecipeHeader categoriesIds={categoriesIds} bookmarks={bookmarks} likes={likes} />
            }
            imageBox={
                <RecipeTags
                    categoriesIds={categoriesIds}
                    bgColor='lime.50'
                    position='absolute'
                    left='8px'
                    top='8px'
                    display={{ lg: 'none', base: 'flex' }}
                />
            }
            actions={
                actions ?? (
                    <RecipeCardActions
                        categoriesIds={categoriesIds}
                        recipeId={_id}
                        cardLinkId={cardLinkId ?? ''}
                    />
                )
            }
        />
    );
};
