import { KitchenTagType } from '~/shared/types/KitchenTagType';
import { DishesImagesType } from '~/shared/ui/DishesImages';

import { AvatarImagesType } from '../ui/AvatarImages';

export interface CardType {
    image: DishesImagesType;
    repostCount: number;
    likeCount: number;
    tagType: KitchenTagType;
    title: string;
    recomendationLabel?: string;
    recomendationIcon?: AvatarImagesType;
    description: string;
}
