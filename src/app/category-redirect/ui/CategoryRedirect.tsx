import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';

import { selectMainCategories } from '~/entities/Category';
import { ROUTES } from '~/shared/config/routes.constants';

export const CategoryRedirect = () => {
    const { category } = useParams();
    const categories = useSelector(selectMainCategories);
    const mainCategory = categories.find((c) => c.category === category);
    const firstSubcategory = mainCategory?.subCategories[0]?.category;

    if (!category || !mainCategory || !firstSubcategory) {
        return <Navigate to={ROUTES.NOT_FOUND} replace />;
    }

    return <Navigate to={`/${category}/${firstSubcategory}`} replace />;
};
