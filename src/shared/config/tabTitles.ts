import childrensMealIcon from "~/shared/assets/kitchen_icons/children's_meals.svg";
import clinicalNutritionIcon from '~/shared/assets/kitchen_icons/clinical_nutrition.svg';
import dessertIcon from '~/shared/assets/kitchen_icons/dessert.svg';
import drinksIcon from '~/shared/assets/kitchen_icons/drinks.svg';
import firstCoursesIcon from '~/shared/assets/kitchen_icons/first_courses.svg';
import grillIcon from '~/shared/assets/kitchen_icons/grilled_dishes.svg';
import nationalIcon from '~/shared/assets/kitchen_icons/national.svg';
import saladIcon from '~/shared/assets/kitchen_icons/salads.svg';
import saucesIcon from '~/shared/assets/kitchen_icons/sauces.svg';
import secondDishesIcon from '~/shared/assets/kitchen_icons/second_dishes.svg';
import snackIcon from '~/shared/assets/kitchen_icons/snack.svg';
import VeganIcon from '~/shared/assets/kitchen_icons/vegan_cuisine.svg';

interface INavbarConfig {
    [key: string]: {
        icon: string;
        tabsLinks: {
            tab: string;
            link: string;
        }[];
        link: string;
    };
}

export const NavbarConfig: INavbarConfig = {
    Салаты: {
        icon: saladIcon,
        link: '/Salads/Meat-salads',
        tabsLinks: [
            { tab: 'Мясные салаты', link: '/Salads/Meat-salads' },
            { tab: 'Рыбные салаты', link: '/Salads/Fish-salads' },
            { tab: 'Овощные салаты', link: '/Salads/Vegetable-salads' },
            { tab: 'Теплые салаты', link: '/Salads/Warm-salads' },
        ],
    },
    Закуски: {
        icon: snackIcon,
        link: '/Appetizers/Meat-appetizers',
        tabsLinks: [
            { tab: 'Мясные закуски', link: '/Appetizers/Meat-appetizers' },
            { tab: 'Рыбные закуски', link: '/Appetizers/Fish-appetizers' },
            { tab: 'Овощные закуски', link: '/Appetizers/Vegetable-appetizers' },
            { tab: 'Теплые закуски', link: '/Appetizers/Warm-appetizers' },
            { tab: 'Бутерброды', link: '/Appetizers/Sandwiches' },
            { tab: 'Фастфуд', link: '/Appetizers/Fast-food' },
        ],
    },
    'Первые блюда': {
        icon: firstCoursesIcon,
        link: '/First-courses/Meat-soups',
        tabsLinks: [
            { tab: 'Мясные супы', link: '/First-courses/Meat-soups' },
            { tab: 'Овощные супы', link: '/First-courses/Vegetable-soups' },
            { tab: 'Бульоны', link: '/First-courses/Broths' },
            { tab: 'Холодные супы', link: '/First-courses/Cold-soups' },
            { tab: 'Диетические супы', link: '/First-courses/Dietary-soups' },
        ],
    },
    'Вторые блюда': {
        icon: secondDishesIcon,
        link: '/Main-courses/Meat',
        tabsLinks: [
            { tab: 'Мясные', link: '/Main-courses/Meat' },
            { tab: 'Рыбные', link: '/Main-courses/Fish' },
            { tab: 'Овощные', link: '/Main-courses/Vegetable' },
            { tab: 'Из птицы', link: '/Main-courses/Poultry' },
            { tab: 'Из грибов', link: '/Main-courses/Mushroom' },
            { tab: 'Из субпродуктов', link: '/Main-courses/Offal' },
            { tab: 'На пару', link: '/Main-courses/Steamed' },
            { tab: 'Пельмени, вареники', link: '/Main-courses/Dumplings' },
            { tab: 'Мучные гарниры', link: '/Main-courses/Flour-side-dishes' },
            { tab: 'Овощные гарниры', link: '/Main-courses/Vegetable-side-dishes' },
            { tab: 'Пицца', link: '/Main-courses/Pizza' },
            { tab: 'Суши', link: '/Main-courses/Sushi' },
        ],
    },
    'Десерты, выпечка': {
        icon: dessertIcon,
        link: '/Desserts-bakery/Pancakes',
        tabsLinks: [
            { tab: 'Блины и оладьи', link: '/Desserts-bakery/Pancakes' },
            { tab: 'Пироги и пончики', link: '/Desserts-bakery/Pies-donuts' },
            { tab: 'Торты', link: '/Desserts-bakery/Cakes' },
            { tab: 'Рулеты', link: '/Desserts-bakery/Rolls' },
            { tab: 'Кексы и маффины', link: '/Desserts-bakery/Cupcakes-muffins' },
            { tab: 'Сырники и ватрушки', link: '/Desserts-bakery/Cheesecakes' },
            { tab: 'Из слоеного теста', link: '/Desserts-bakery/Puff-pastry' },
            { tab: 'Из заварного теста', link: '/Desserts-bakery/Choux-pastry' },
            { tab: 'Из дрожжевого теста', link: '/Desserts-bakery/Yeast-dough' },
            { tab: 'Булочки и сдоба', link: '/Desserts-bakery/Buns-pastries' },
            { tab: 'Хлеб', link: '/Desserts-bakery/Bread' },
            { tab: 'Тесто на пиццу', link: '/Desserts-bakery/Pizza-dough' },
            { tab: 'Кремы', link: '/Desserts-bakery/Creams' },
        ],
    },
    'Блюда на гриле': {
        icon: grillIcon,
        link: '/Grill-dishes/Beef',
        tabsLinks: [
            { tab: 'Говядина', link: '/Grill-dishes/Beef' },
            { tab: 'Свинина', link: '/Grill-dishes/Pork' },
            { tab: 'Птица', link: '/Grill-dishes/Poultry' },
            { tab: 'Рыба', link: '/Grill-dishes/Fish' },
            { tab: 'Грибы', link: '/Grill-dishes/Mushrooms' },
            { tab: 'Овощи', link: '/Grill-dishes/Vegetables' },
        ],
    },
    'Веганская кухня': {
        icon: VeganIcon,
        link: '/Vegan-cuisine/Main-courses',
        tabsLinks: [
            { tab: 'Закуски', link: '/Vegan-cuisine/Appetizers' },
            { tab: 'Первые блюда', link: '/Vegan-cuisine/First-courses' },
            { tab: 'Вторые блюда', link: '/Vegan-cuisine/Main-courses' },
            { tab: 'Гарниры', link: '/Vegan-cuisine/Side-dishes' },
            { tab: 'Десерты', link: '/Vegan-cuisine/Desserts' },
            { tab: 'Выпечка', link: '/Vegan-cuisine/Bakery' },
            { tab: 'Сыроедческие блюда', link: '/Vegan-cuisine/Raw-food' },
            { tab: 'Напитки', link: '/Vegan-cuisine/Drinks' },
        ],
    },
    'Детские блюда': {
        icon: childrensMealIcon,
        link: '/Childrens-meals/First-courses',
        tabsLinks: [
            { tab: 'Первые блюда', link: '/Childrens-meals/First-courses' },
            { tab: 'Вторые блюда', link: '/Childrens-meals/Main-courses' },
            { tab: 'Гарниры', link: '/Childrens-meals/Side-dishes' },
            { tab: 'Выпечка', link: '/Childrens-meals/Bakery' },
            { tab: 'Без глютена', link: '/Childrens-meals/Gluten-free' },
            { tab: 'Без сахара', link: '/Childrens-meals/Sugar-free' },
            { tab: 'Без аллергенов', link: '/Childrens-meals/Allergen-free' },
            { tab: 'Блюда для прикорма', link: '/Childrens-meals/Complementary-food' },
        ],
    },
    'Лечебное питание': {
        icon: clinicalNutritionIcon,
        link: '/Medical-nutrition/Childrens-diet',
        tabsLinks: [
            { tab: 'Детская диета', link: '/Medical-nutrition/Childrens-diet' },
            { tab: 'Диета №1', link: '/Medical-nutrition/Diet-1' },
            { tab: 'Диета №2', link: '/Medical-nutrition/Diet-2' },
            { tab: 'Диета №3', link: '/Medical-nutrition/Diet-3' },
            { tab: 'Диета №4', link: '/Medical-nutrition/Diet-4' },
            { tab: 'Диета №5', link: '/Medical-nutrition/Diet-5' },
            { tab: 'Диета №6', link: '/Medical-nutrition/Diet-6' },
            { tab: 'Диета №7', link: '/Medical-nutrition/Diet-7' },
            { tab: 'Диета №8', link: '/Medical-nutrition/Diet-8' },
            { tab: 'Диета №9', link: '/Medical-nutrition/Diet-9' },
            { tab: 'Диета №10', link: '/Medical-nutrition/Diet-10' },
            { tab: 'Диета №11', link: '/Medical-nutrition/Diet-11' },
            { tab: 'Диета №12', link: '/Medical-nutrition/Diet-12' },
            { tab: 'Диета №13', link: '/Medical-nutrition/Diet-13' },
            { tab: 'Диета №14', link: '/Medical-nutrition/Diet-14' },
            { tab: 'Без глютена', link: '/Medical-nutrition/Gluten-free' },
            { tab: 'Без аллергенов', link: '/Medical-nutrition/Allergen-free' },
        ],
    },
    Национальные: {
        icon: nationalIcon,
        link: '/National-cuisines/American',
        tabsLinks: [
            { tab: 'Американская кухня', link: '/National-cuisines/American' },
            { tab: 'Армянская кухня', link: '/National-cuisines/Armenian' },
            { tab: 'Греческая кухня', link: '/National-cuisines/Greek' },
            { tab: 'Грузинская кухня', link: '/National-cuisines/Georgian' },
            { tab: 'Итальянская кухня', link: '/National-cuisines/Italian' },
            { tab: 'Испанская кухня', link: '/National-cuisines/Spanish' },
            { tab: 'Китайская кухня', link: '/National-cuisines/Chinese' },
            { tab: 'Мексиканская кухня', link: '/National-cuisines/Mexican' },
            { tab: 'Паназиатская кухня', link: '/National-cuisines/Pan-Asian' },
            { tab: 'Русская кухня', link: '/National-cuisines/Russian' },
            { tab: 'Турецкая кухня', link: '/National-cuisines/Turkish' },
            { tab: 'Французская кухня', link: '/National-cuisines/French' },
            { tab: 'Шведская кухня', link: '/National-cuisines/Swedish' },
            { tab: 'Японская кухня', link: '/National-cuisines/Japanese' },
            { tab: 'Другая кухня', link: '/National-cuisines/Other' },
        ],
    },
    Соусы: {
        icon: saucesIcon,
        link: '/Sauces/Meat-sauces',
        tabsLinks: [
            { tab: 'Соусы мясные', link: '/Sauces/Meat-sauces' },
            { tab: 'Соусы сырные', link: '/Sauces/Cheese-sauces' },
            { tab: 'Маринады', link: '/Sauces/Marinades' },
        ],
    },
    /* 'Домашние заготовки': {
        icon: saucesIcon,
        link: '/Домашние заготовки/Мясные заготовки',
        tabsLinks: [
            { tab: 'Мясные заготовки', link: '/Домашние заготовки/Мясные заготовки' },
            { tab: 'Рыбные заготовки', link: '/Домашние заготовки/Рыбные заготовки' },
            { tab: 'Из огурцов', link: '/Домашние заготовки/Из огурцов' },
            { tab: 'Из томатов', link: '/Домашние заготовки/Из томатов' },
            { tab: 'Из грибов', link: '/Домашние заготовки/Из грибов' },
            { tab: 'Овощные заготовки', link: '/Домашние заготовки/Овощные заготовки' },
            { tab: 'Салаты, икра', link: '/Домашние заготовки/Салаты, икра' },
            { tab: 'Из фруктов и ягод', link: '/Домашние заготовки/Из фруктов и ягод' },
        ],
    }, */
    Напитки: {
        icon: drinksIcon,
        link: '/Drinks/Juices',
        tabsLinks: [
            { tab: 'Соки и фреши', link: '/Drinks/Juices' },
            { tab: 'Смузи', link: '/Drinks/Smoothies' },
            { tab: 'Компоты', link: '/Drinks/Compotes' },
            { tab: 'Кисели', link: '/Drinks/Kissels' },
            { tab: 'Кофе', link: '/Drinks/Coffee' },
            { tab: 'Лечебный чай', link: '/Drinks/Medicinal-tea' },
            { tab: 'Квас', link: '/Drinks/Kvass' },
            { tab: 'Коктейли', link: '/Drinks/Cocktails' },
            { tab: 'Алкогольные', link: '/Drinks/Alcoholic' },
        ],
    },
};
