import { CategoriesArray } from './category';

export interface NavigationBackupState {
    categories: CategoriesArray;
    lastSuccessfulFetch: string | null;
}
