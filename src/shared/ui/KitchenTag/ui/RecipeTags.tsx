import { Flex, FlexProps } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectMainCategories, selectSubcategories } from '~/entities/Category/model/selectors';

import { CategoryTag } from './CategoryTag';

interface RecipeTagsProps extends FlexProps {
    categoriesIds: string[];
    limit?: number;
    bgColor: string;
}

export const RecipeTags = (props: RecipeTagsProps) => {
    const { categoriesIds, bgColor, limit = 1, ...rest } = props;
    const subcategories = useSelector(selectSubcategories);
    const maincategories = useSelector(selectMainCategories);

    if (!categoriesIds) return null;

    const recipeSubcategories = subcategories.filter((sub) => categoriesIds.includes(sub._id));

    // eslint-disable-next-line arrow-body-style
    const recipeMaincategories = maincategories.filter((main) => {
        // eslint-disable-next-line arrow-body-style
        return main.subCategories.some((sub) => {
            return recipeSubcategories.some((recipeSub) => recipeSub._id === sub._id);
        });
    });

    return (
        <Flex {...rest}>
            {recipeMaincategories
                .map((category) => (
                    <CategoryTag
                        key={category._id}
                        title={category.title}
                        icon={category.icon}
                        bgColor={bgColor}
                    />
                ))
                .slice(0, limit)}
        </Flex>
    );
};
