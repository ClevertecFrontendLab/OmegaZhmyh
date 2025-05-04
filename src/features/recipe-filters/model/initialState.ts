import { AllergenState, DrawerState, FiltersState } from './types';

const allergenInitialState: AllergenState = {
    isExcluding: false,
    selectedAllergens: [],
    customAllergen: '',
};

const drawerInitialState: DrawerState = {
    meatTypes: [],
    sideDishes: [],
    allergens: structuredClone(allergenInitialState),
    categories: [],
    authors: [],
};

export const initialState: FiltersState = {
    isActive: false,
    isAvailable: false,
    drawerFilters: structuredClone(drawerInitialState),
    drawerUIState: structuredClone(drawerInitialState),
    options: {
        allergenFilters: [
            'Молочные продукты',
            'Яйцо',
            'Моллюски',
            'Рыба',
            'Орехи',
            'Томат (помидор)',
            'Цитрусовые',
            'Клубника (ягоды)',
            'Шоколад',
        ],
        sideDishFilters: [
            'Картошка',
            'Гречка',
            'Паста',
            'Спагетти',
            'Рис',
            'Капуста',
            'Фасоль',
            'Другие овощи',
        ],
        meatTypeFilters: ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'],
        authorFilters: [],
    },
    search: {
        searchQuery: '',
        activeSearchQuery: '',
        isSearchAvailable: false,
        isSearchActive: false,
        isSearchLoading: false,
        countSearchedRecipes: 0,
    },
    allergens: structuredClone(allergenInitialState),
};
