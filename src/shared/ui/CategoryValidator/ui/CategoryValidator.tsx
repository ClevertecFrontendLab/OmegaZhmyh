import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { selectAllCategories } from '~/entities/Category';
import { MainCategory } from '~/entities/Category/types';
import { userLoadingSelector } from '~/shared/store/app-slice';

export const CategoryValidator = ({ children }: { children: React.ReactNode }) => {
    const { category, subcategory } = useParams();
    const categories = useSelector(selectAllCategories);
    const isLoading = useSelector(userLoadingSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading || !categories.length) return;

        const mainCategory = categories.find(
            (cat): cat is MainCategory => 'subCategories' in cat && cat.category === category,
        );

        if (!category || !mainCategory) {
            navigate('/not-found', { replace: true });
            return;
        }

        if (subcategory) {
            const isValidSubcategory = mainCategory.subCategories.some(
                (sub) => sub.category === subcategory,
            );

            if (!isValidSubcategory) {
                navigate('/not-found', { replace: true });
            }
        }
    }, [category, subcategory, categories, isLoading, navigate]);

    return children;
};
