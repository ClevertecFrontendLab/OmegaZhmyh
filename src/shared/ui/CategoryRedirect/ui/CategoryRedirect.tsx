import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';

import { selectAllCategories } from '~/entities/Category';

export const CategoryRedirect = () => {
    const { category } = useParams();
    const categories = useSelector(selectAllCategories);

    if (!category || !categories[category]) {
        return <Navigate to='/' replace />;
    }

    const firstSubcategory = categories[category].subcategory[0]?.name;

    if (!firstSubcategory) {
        return <Navigate to='/' replace />;
    }

    return <Navigate to={`/${category}/${firstSubcategory}`} replace />;
};
