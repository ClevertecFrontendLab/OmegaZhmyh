import { Navigate, useParams } from 'react-router';

import { MainCategory } from '~/entities/Category/types';
import { useGetCategoriesQuery } from '~/shared/api/yeedaaApi';

export const CategoryValidator = ({ children }: { children: React.ReactNode }) => {
    const { category, subcategory } = useParams();
    const { data: categoriesData, isLoading, isSuccess } = useGetCategoriesQuery();
    const categories = categoriesData ?? [];

    const mainCategory = categories.find(
        (cat): cat is MainCategory => 'subCategories' in cat && cat.category === category,
    );
    const isValidSubcategory = mainCategory?.subCategories.some(
        (sub) => sub.category === subcategory,
    );

    if (isLoading) {
        return null;
    }

    if ((isSuccess && categories.length === 0) || !isValidSubcategory) {
        return <Navigate to='/not-found' />;
    }

    return children;
};
