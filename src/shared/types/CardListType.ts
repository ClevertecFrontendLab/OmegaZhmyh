import { KitchenTagType } from '~/shared/types/KitchenTagType';
import { DishesImagesType } from '~/shared/ui/DishesImages';

export interface CardType {
    image: DishesImagesType;
    repostCount: number;
    likeCount: number;
    tagType: KitchenTagType;
    title: string;
    recomendationLabel?: string;
    description: string;
}
