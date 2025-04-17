import ChildrensMealIcon from "~/shared/assets/kitchen_icons/children's_meals.svg";
import ClinicalNutritionIcon from '~/shared/assets/kitchen_icons/clinical_nutrition.svg';
import DessertIcon from '~/shared/assets/kitchen_icons/dessert.svg';
import DrinksIcon from '~/shared/assets/kitchen_icons/drinks.svg';
import FirstCoursesIcon from '~/shared/assets/kitchen_icons/first_courses.svg';
import GrilledDishesIcon from '~/shared/assets/kitchen_icons/grilled_dishes.svg';
import NationalIcon from '~/shared/assets/kitchen_icons/national.svg';
import SaladsIcon from '~/shared/assets/kitchen_icons/salads.svg';
import SaucesIcon from '~/shared/assets/kitchen_icons/sauces.svg';
import SecondDishesIcon from '~/shared/assets/kitchen_icons/second_dishes.svg';
import SnackIcon from '~/shared/assets/kitchen_icons/snack.svg';
import VeganCuisineIcon from '~/shared/assets/kitchen_icons/vegan_cuisine.svg';

export const kitchenIcons: { [key: string]: string } = {
    salads: SaladsIcon,
    snacks: SnackIcon,
    'Первые блюда': FirstCoursesIcon,
    'second-dish': SecondDishesIcon,
    'Десерты, выпечка': DessertIcon,
    'Блюда на гриле': GrilledDishesIcon,
    vegan: VeganCuisineIcon,
    'Детские блюда': ChildrensMealIcon,
    'Лечебное питание': ClinicalNutritionIcon,
    national: NationalIcon,
    Соусы: SaucesIcon,
    Напитки: DrinksIcon,
};
