import { AllergenState, DrawerState, FiltersState } from './types';

const allergenInitialState: AllergenState = {
    isExcluding: false,
    selectedAllergens: [],
    customAllergen: '',
};

const filtersInitialState: DrawerState = {
    meatTypeFilters: [],
    sideDishFilters: [],
    categoryFilters: [],
    authorFilters: [],
};

export const initialState: FiltersState = {
    isActive: false,
    isAvailable: false,
    currentFilters: structuredClone(filtersInitialState),
    drawerUIState: structuredClone(filtersInitialState),
    filtersOptions: {
        allergenOptions: [
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
        sideDishOptions: [
            'Картошка',
            'Гречка',
            'Паста',
            'Спагетти',
            'Рис',
            'Капуста',
            'Фасоль',
            'Другие овощи',
        ],
        meatTypeOptions: ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'],
        authorOptions: [],
    },
    search: {
        searchQuery: '',
        activeSearchQuery: '',
        isSearchAvailable: false,
        isSearchActive: false,
        isSearchLoading: false,
        countSearchedRecipes: null,
    },

    allergens: structuredClone(allergenInitialState),
};
