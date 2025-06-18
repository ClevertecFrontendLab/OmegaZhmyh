import { Button } from '@chakra-ui/react';
import { Link } from 'react-router';

import { selectMainCategories, selectSubCategories } from '~/entities/category';
import { EDIT_RECIPE } from '~/shared/config';
import { useAppSelector } from '~/shared/store';

type RecipeCardEditButtonProps = {
    categoriesIds: string[];
    recipeId: string;
};

export const RecipeCardEditButton = ({ categoriesIds, recipeId }: RecipeCardEditButtonProps) => {
    const mainCategories = useAppSelector(selectMainCategories);
    const subCategories = useAppSelector(selectSubCategories);
    const subCategory = subCategories.find((sub) => sub._id === categoriesIds?.[0]);
    const mainCategory = mainCategories.find((cat) => cat._id === subCategory?.rootCategoryId);

    return (
        <Button
            as={Link}
            to={`${EDIT_RECIPE}/${mainCategory?.category}/${subCategory?.category}/${recipeId}`}
            size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
            variant='outline'
            colorScheme='black'
        >
            Редактировать
        </Button>
    );
};
