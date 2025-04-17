import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

import { RecipeCard } from '~/entities/Recipe';
import { CardType } from '~/shared/types/CardListType';

interface RecipeCardListProps extends SimpleGridProps {
    cardList: CardType[];
}

export const RecipeCardList = ({ cardList, ...gridProps }: RecipeCardListProps) => (
    <SimpleGrid {...gridProps}>
        {cardList.map((cardInfo) => (
            <RecipeCard
                key={cardInfo.title}
                image={cardInfo.image}
                repostCount={cardInfo.repostCount}
                likeCount={cardInfo.likeCount}
                tagType={cardInfo.tagType}
                recomendationLabel={cardInfo.recomendationLabel}
                recomendationIcon={cardInfo.recomendationIcon}
                title={cardInfo.title}
                description={cardInfo.description}
            />
        ))}
    </SimpleGrid>
);
