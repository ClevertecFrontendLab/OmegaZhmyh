import { AllergenState, DrawerState, FiltersState } from './types';

const allergenInitialState: AllergenState = {
    isExcluding: false,
    selectedAllergens: [],
    customAllergen: '',
};

const drawerInitialState: DrawerState = {
    isActive: false,
    isAvailable: false,
    meatTypes: [],
    sideDishes: [],
    allergens: structuredClone(allergenInitialState),
    categories: [],
    authors: [],
};

export const initialState: FiltersState = {
    drawerFilters: structuredClone(drawerInitialState),
    drawerUIState: structuredClone(drawerInitialState),
    labels: {
        allergenFilters: [
            { label: 'Молочные продукты', name: 'моло' },
            { label: 'Яйцо', name: 'яйцо' },
            { label: 'Моллюски', name: '' },
            { label: 'Рыба', name: 'рыб' },
            { label: 'Орехи', name: 'орех' },
            { label: 'Томат (помидор)', name: 'томат' },
            { label: 'Цитрусовые', name: 'цитрус' },
            { label: 'Клубника (ягоды)', name: 'клубни' },
            { label: 'Шоколад', name: 'шоколад' },
        ],
        sideDishFilters: [
            { label: 'Картошка', name: 'potatoes' },
            { label: 'Гречка', name: 'buckwheat' },
            { label: 'Паста', name: 'pasta' },
            { label: 'Спагетти', name: 'spaghetti' },
            { label: 'Рис', name: 'rice' },
            { label: 'Капуста', name: 'cabbage' },
            { label: 'Фасоль', name: 'bean' },
            { label: 'Другие овощи', name: 'Другие овощи' },
        ],
        meatTypeFilters: [
            { label: 'Курица', name: 'chicken' },
            { label: 'Свинина', name: 'pork' },
            { label: 'Говядина', name: 'beef' },
            { label: 'Индейка', name: 'turkey' },
            { label: 'Утка', name: 'duck' },
        ],
        authorFilters: [],
    },
    search: {
        searchQuery: '',
        activeSearchQuery: '',
        isSearchAvailable: false,
        isSearchActive: false,
        countSearchedRecipes: 0,
    },
    allergens: structuredClone(allergenInitialState),
};
