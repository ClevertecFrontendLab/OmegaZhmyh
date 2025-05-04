import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { selectAllCategories } from '~/entities/Category';
import { MainCategory } from '~/entities/Category/types';

export const CategoryValidator = () => {
    const { category, subcategory } = useParams();
    const categories = useSelector(selectAllCategories);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [category, subcategory, categories, navigate]);

    return null;
};
