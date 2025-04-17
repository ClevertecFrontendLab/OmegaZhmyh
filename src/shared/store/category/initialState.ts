import ChildrensMealIcon from "~/shared/assets/kitchen_icons/children's_meals.svg";
import ClinicalNutritionIcon from '~/shared/assets/kitchen_icons/clinical_nutrition.svg';
import DessertIcon from '~/shared/assets/kitchen_icons/dessert.svg';
import DrinksIcon from '~/shared/assets/kitchen_icons/drinks.svg';
import FirstCoursesIcon from '~/shared/assets/kitchen_icons/first_courses.svg';
import GrillIcon from '~/shared/assets/kitchen_icons/grilled_dishes.svg';
import NationalIcon from '~/shared/assets/kitchen_icons/national.svg';
import SaladIcon from '~/shared/assets/kitchen_icons/salads.svg';
import SaucesIcon from '~/shared/assets/kitchen_icons/sauces.svg';
import SecondDishesIcon from '~/shared/assets/kitchen_icons/second_dishes.svg';
import SnackIcon from '~/shared/assets/kitchen_icons/snack.svg';
import VeganIcon from '~/shared/assets/kitchen_icons/vegan_cuisine.svg';

import { categoryShema } from './types';

export const initialState: categoryShema = {
    salads: {
        icon: SaladIcon,
        label: 'Салаты',
        subcategory: [
            { name: 'meat-salads', label: 'Мясные салаты' },
            { name: 'fish-salads', label: 'Рыбные салаты' },
            { name: 'vegetable-salads', label: 'Овощные салаты' },
            { name: 'warm-salads', label: 'Теплые салаты' },
        ],
    },
    snacks: {
        icon: SnackIcon,
        label: 'Закуски',
        subcategory: [
            { name: 'meat-snacks', label: 'Мясные закуски' },
            { name: 'fish-snacks', label: 'Рыбные закуски' },
            { name: 'vegetable-snacks', label: 'Овощные закуски' },
            { name: 'warm-snacks', label: 'Теплые закуски' },
            { name: 'sandwiches', label: 'Бутерброды' },
            { name: 'fast-food', label: 'Фастфуд' },
        ],
    },
    'first-courses': {
        icon: FirstCoursesIcon,
        label: 'Первые блюда',
        subcategory: [
            { name: 'meat-soups', label: 'Мясные супы' },
            { name: 'vegetable-soups', label: 'Овощные супы' },
            { name: 'broths', label: 'Бульоны' },
            { name: 'cold-soups', label: 'Холодные супы' },
            { name: 'dietary-soups', label: 'Диетические супы' },
        ],
    },
    'second-dish': {
        icon: SecondDishesIcon,
        label: 'Вторые блюда',
        subcategory: [
            { name: 'meat', label: 'Мясные' },
            { name: 'fish', label: 'Рыбные' },
            { name: 'vegetables', label: 'Овощные' },
            { name: 'poultry-dish', label: 'Из птицы' },
            { name: 'mushroom', label: 'Из грибов' },
            { name: 'offal', label: 'Из субпродуктов' },
            { name: 'steamed', label: 'На пару' },
            { name: 'dumplings', label: 'Пельмени, вареники' },
            { name: 'flour-side-dishes', label: 'Мучные гарниры' },
            { name: 'vegetable-side-dishes', label: 'Овощные гарниры' },
            { name: 'pizza', label: 'Пицца' },
            { name: 'sushi', label: 'Суши' },
        ],
    },
    'desserts-bakery': {
        icon: DessertIcon,
        label: 'Десерты, выпечка',
        subcategory: [
            { name: 'pancakes', label: 'Блины и оладьи' },
            { name: 'pies-donuts', label: 'Пироги и пончики' },
            { name: 'cakes', label: 'Торты' },
            { name: 'rolls', label: 'Рулеты' },
            { name: 'cupcakes-muffins', label: 'Кексы и маффины' },
            { name: 'cheesecakes', label: 'Сырники и ватрушки' },
            { name: 'puff-pastry', label: 'Из слоеного теста' },
            { name: 'choux-pastry', label: 'Из заварного теста' },
            { name: 'yeast-dough', label: 'Из дрожжевого теста' },
            { name: 'buns-pastries', label: 'Булочки и сдоба' },
            { name: 'bread', label: 'Хлеб' },
            { name: 'pizza-dough', label: 'Тесто на пиццу' },
            { name: 'creams', label: 'Кремы' },
        ],
    },
    'grill-dishes': {
        icon: GrillIcon,
        label: 'Блюда на гриле',
        subcategory: [
            { name: 'beef', label: 'Говядина' },
            { name: 'pork', label: 'Свинина' },
            { name: 'poultry', label: 'Птица' },
            { name: 'fish', label: 'Рыба' },
            { name: 'mushrooms', label: 'Грибы' },
            { name: 'vegetables', label: 'Овощи' },
        ],
    },
    vegan: {
        icon: VeganIcon,
        label: 'Веганская кухня',
        subcategory: [
            { name: 'snacks', label: 'Закуски' },
            { name: 'first-courses', label: 'Первые блюда' },
            { name: 'second-dish', label: 'Вторые блюда' },
            { name: 'side-dishes', label: 'Гарниры' },
            { name: 'desserts', label: 'Десерты' },
            { name: 'bakery', label: 'Выпечка' },
            { name: 'raw-food', label: 'Сыроедческие блюда' },
            { name: 'drinks', label: 'Напитки' },
        ],
    },
    'childrens-meals': {
        icon: ChildrensMealIcon,
        label: 'Детские блюда',
        subcategory: [
            { name: 'first-courses', label: 'Первые блюда' },
            { name: 'second-dish', label: 'Вторые блюда' },
            { name: 'side-dishes', label: 'Гарниры' },
            { name: 'bakery', label: 'Выпечка' },
            { name: 'gluten-free', label: 'Без глютена' },
            { name: 'sugar-free', label: 'Без сахара' },
            { name: 'allergen-free', label: 'Без аллергенов' },
            { name: 'complementary-food', label: 'Блюда для прикорма' },
        ],
    },
    'medical-nutrition': {
        icon: ClinicalNutritionIcon,
        label: 'Лечебное питание',
        subcategory: [
            { name: 'childrens-diet', label: 'Детская диета' },
            { name: 'diet-1', label: 'Диета №1' },
            { name: 'diet-2', label: 'Диета №2' },
            { name: 'diet-3', label: 'Диета №3' },
            { name: 'diet-4', label: 'Диета №4' },
            { name: 'diet-5', label: 'Диета №5' },
            { name: 'diet-6', label: 'Диета №6' },
            { name: 'diet-7', label: 'Диета №7' },
            { name: 'diet-8', label: 'Диета №8' },
            { name: 'diet-9', label: 'Диета №9' },
            { name: 'diet-10', label: 'Диета №10' },
            { name: 'diet-11', label: 'Диета №11' },
            { name: 'diet-12', label: 'Диета №12' },
            { name: 'diet-13', label: 'Диета №13' },
            { name: 'diet-14', label: 'Диета №14' },
            { name: 'gluten-free', label: 'Без глютена' },
            { name: 'allergen-free', label: 'Без аллергенов' },
        ],
    },
    national: {
        icon: NationalIcon,
        label: 'Национальные',
        subcategory: [
            { name: 'american', label: 'Американская кухня' },
            { name: 'armenian', label: 'Армянская кухня' },
            { name: 'greek', label: 'Греческая кухня' },
            { name: 'georgian', label: 'Грузинская кухня' },
            { name: 'italian', label: 'Итальянская кухня' },
            { name: 'spanish', label: 'Испанская кухня' },
            { name: 'chinese', label: 'Китайская кухня' },
            { name: 'mexican', label: 'Мексиканская кухня' },
            { name: 'pan-asian', label: 'Паназиатская кухня' },
            { name: 'russian', label: 'Русская кухня' },
            { name: 'turkish', label: 'Турецкая кухня' },
            { name: 'french', label: 'Французская кухня' },
            { name: 'swedish', label: 'Шведская кухня' },
            { name: 'japanese', label: 'Японская кухня' },
            { name: 'other', label: 'Другая кухня' },
        ],
    },
    sauces: {
        icon: SaucesIcon,
        label: 'Соусы',
        subcategory: [
            { name: 'meat-sauces', label: 'Соусы мясные' },
            { name: 'cheese-sauces', label: 'Соусы сырные' },
            { name: 'marinades', label: 'Маринады' },
        ],
    },
    /* 'Домашние заготовки': {
        icon: saucesIcon,
        label: 'Домашние заготовки',
        subcategory: [
            {name: 'Мясные заготовки', label: 'Мясные заготовки'},
            {name: 'Рыбные заготовки', label: 'Рыбные заготовки'},
            {name: 'Из огурцов', label: 'Из огурцов'},
            {name: 'Из томатов', label: 'Из томатов'},
            {name: 'Из грибов', label: 'Из грибов'},
            {name: 'Овощные заготовки', label: 'Овощные заготовки'},
            {name: 'Салаты, икра', label: 'Салаты, икра'},
            {name: 'Из фруктов и ягод', label: 'Из фруктов и ягод'},
        ],
    }, */
    drinks: {
        icon: DrinksIcon,
        label: 'Напитки',
        subcategory: [
            { name: 'juices', label: 'Соки и фреши' },
            { name: 'smoothies', label: 'Смузи' },
            { name: 'compotes', label: 'Компоты' },
            { name: 'kissels', label: 'Кисели' },
            { name: 'coffee', label: 'Кофе' },
            { name: 'medicinal-tea', label: 'Лечебный чай' },
            { name: 'kvass', label: 'Квас' },
            { name: 'cocktails', label: 'Коктейли' },
            { name: 'alcoholic', label: 'Алкогольные' },
        ],
    },
};
