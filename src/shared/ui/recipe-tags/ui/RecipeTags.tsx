import { Flex, FlexProps } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectMainCategories, selectSubCategories } from '~/entities/category';

import { CategoryTag } from './CategoryTag';

type RecipeTagsProps = FlexProps & {
    categoriesIds: string[];
    bgColor: string;
    limit?: number;
};

export const RecipeTags = (props: RecipeTagsProps) => {
    const { categoriesIds, bgColor, limit = 1, ...rest } = props;
    const subcategories = useSelector(selectSubCategories);
    const maincategories = useSelector(selectMainCategories);

    if (!categoriesIds) return null;

    const recipeSubcategories = subcategories.filter((sub) => categoriesIds.includes(sub._id));

    const recipeMaincategories = maincategories.filter((main) =>
        main.subCategories.some((sub) =>
            recipeSubcategories.some((recipeSub) => recipeSub._id === sub._id),
        ),
    );

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
