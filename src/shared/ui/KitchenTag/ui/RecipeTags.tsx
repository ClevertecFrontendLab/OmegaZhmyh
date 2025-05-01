import { Flex, FlexProps } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectAllCategories } from '~/entities/Category/model/selectors';

import { CategoryTag } from './CategoryTag';

interface RecipeTagsProps extends FlexProps {
    categoriesIds: string[];
    bgColor: string;
}

export const RecipeTags = (props: RecipeTagsProps) => {
    const { categoriesIds, bgColor } = props;
    const categories = useSelector(selectAllCategories);

    if (!categoriesIds) return null;

    const recipeCategories = categories.filter((category) => categoriesIds.includes(category._id));
    const recipeMainCategory = recipeCategories.filter((category) => 'subCategories' in category);

    return recipeMainCategory.map((category) => (
        <Flex>
            <CategoryTag
                key={category._id}
                title={category.title}
                icon={category.icon}
                bgColor={bgColor}
            />
        </Flex>
    ));
};
