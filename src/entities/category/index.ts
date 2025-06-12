export { useGetCategoriesQuery, useGetCategoryByIdQuery } from './api/categoryApi';
export type { MainCategory, SubCategory } from './model/category.types';
export {
    categorySlice,
    selectAllCategories,
    selectCategoryById,
    selectMainCategories,
    selectRecipeSubCategories,
    selectSubCategories,
} from './model/slice';
export { categoryReducer, setCategories } from './model/slice';
