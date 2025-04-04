import { Grid, GridItem } from '@chakra-ui/react';

import { TextCard } from '~/shared/ui/TextCard';
import { TextTagCard } from '~/shared/ui/TextTagCard';
import { TextTagCardProps } from '~/shared/ui/TextTagCard/ui/TextTagCard';

interface RelevantKitchenProps {
    title: string;
    description: string;
    card1: TextTagCardProps;
    card2: TextTagCardProps;
    miniCardText1: string;
    miniCardText2: string;
    miniCardText3: string;
}

export const RelevantKitchen = (props: RelevantKitchenProps) => {
    const { title, description, card1, card2, miniCardText1, miniCardText2, miniCardText3 } = props;
    return (
        <Grid
            templateColumns={{ base: '1fr', sm: '1fr 1fr 2fr' }}
            templateAreas={{
                lg: `"title title desc" 
            "Card1 Card2 TextCard1" 
            "Card1 Card2 TextCard2" 
            "Card1 Card2 TextCard3"`,
                md: `"title desc desc" 
            "Card1 Card2 TextCard1" 
            "Card1 Card2 TextCard2" 
            "Card1 Card2 TextCard3"`,
                sm: `"title title title" 
            "desc desc desc" 
            "Card1 Card2 TextCard1" 
            "Card1 Card2 TextCard2" 
            "Card1 Card2 TextCard3"`,
                base: `"title" 
            "desc" 
            "Card1" 
            "Card2"
            "TextCard1"
            "TextCard2"
            "TextCard3"`,
            }}
            alignItems='center'
            gap={6}
            padding=''
        >
            <GridItem area='title' fontSize='5xl'>
                {title}
            </GridItem>
            <GridItem area='desc' fontSize='md' color='blackAlpha.600'>
                {description}
            </GridItem>

            <GridItem area='Card1'>
                <TextTagCard {...card1} />
            </GridItem>
            <GridItem area='Card2'>
                <TextTagCard {...card2} />
            </GridItem>

            <GridItem area='TextCard1'>
                <TextCard text={miniCardText1} icon='Детские блюда' />
            </GridItem>
            <GridItem area='TextCard2'>
                <TextCard text={miniCardText2} icon='Национальные' />
            </GridItem>
            <GridItem area='TextCard3'>
                <TextCard text={miniCardText3} icon='Веганская кухня' />
            </GridItem>
        </Grid>
    );
};
