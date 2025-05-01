export {
    selectAllCategories,
    selectMainCategories,
    selectPageCategory,
    selectPageSubcategory,
    selectSubcategories,
} from './model/selectors';
export { categoryReducer } from './model/slice';
export { setCategories, setPageCategory, setPageSubcategory } from './model/slice';
export type { MainCategory, SubCategory } from './types';
