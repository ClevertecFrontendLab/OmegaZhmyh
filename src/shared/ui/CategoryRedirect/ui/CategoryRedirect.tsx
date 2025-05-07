import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';

import { selectMainCategories } from '~/entities/Category';

export const CategoryRedirect = () => {
    const { category } = useParams();
    const categories = useSelector(selectMainCategories);
    const mainCategory = categories.find((c) => c.category == category);

    if (!category || !mainCategory) {
        return <Navigate to='/' replace />;
    }

    const firstSubcategory = mainCategory.subCategories[0]?.category;

    if (!firstSubcategory) {
        return <Navigate to='/' replace />;
    }

    return <Navigate to={`/${category}/${firstSubcategory}`} replace />;
};
