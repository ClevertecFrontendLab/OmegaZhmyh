import CabbageCutletsImg from '~/shared/assets/recipe_img/Cabbage_cutlets.jpg';
import GarlicPotatoImg from '~/shared/assets/recipe_img/garlic_potato.jpg';
import GrechkaImg from '~/shared/assets/recipe_img/grechka.jpg';
import HamImg from '~/shared/assets/recipe_img/ham.jpg';
import LasagnaImg from '~/shared/assets/recipe_img/lasagna.jpg';
import MeatballImg from '~/shared/assets/recipe_img/meatball.jpg';
import MushroomSaladImg from '~/shared/assets/recipe_img/Mushroom_salad.jpg';
import NoodlesImg from '~/shared/assets/recipe_img/Noodles_with_chicken_and_saffron.jpg';
import PancakesRollImg from '~/shared/assets/recipe_img/Pancakes.jpg';
import PotatoImg from '~/shared/assets/recipe_img/potato.jpg';
import PuriImg from '~/shared/assets/recipe_img/Puri.jpg';
import RollsImg from '~/shared/assets/recipe_img/rolls.jpg';
import SaladImg from '~/shared/assets/recipe_img/salad.jpg';
import SpaghettiRollImg from '~/shared/assets/recipe_img/Spaghetti_Roll.jpg';
import TomYangImg from '~/shared/assets/recipe_img/Tom-yang.jpg';

export const DishesImages = {
    PuriImg,
    SpaghettiRollImg,
    TomYangImg,
    GarlicPotatoImg,
    LasagnaImg,
    MeatballImg,
    PotatoImg,
    RollsImg,
    HamImg,
    NoodlesImg,
    CabbageCutletsImg,
    SaladImg,
    PancakesRollImg,
    MushroomSaladImg,
    GrechkaImg,
};
export type DishesImagesType = keyof typeof DishesImages;
