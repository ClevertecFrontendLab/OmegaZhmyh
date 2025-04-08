import { Grid, GridItem, GridProps, SimpleGrid } from '@chakra-ui/react';

import { TextCard } from '~/shared/ui/TextCard';
import { TextTagCard } from '~/shared/ui/TextTagCard';
import { TextTagCardProps } from '~/shared/ui/TextTagCard/ui/TextTagCard';

interface RelevantKitchenProps extends GridProps {
    title: string;
    description: string;
    card1: TextTagCardProps;
    card2: TextTagCardProps;
    miniCardText1: string;
    miniCardText2: string;
    miniCardText3: string;
}

export const RelevantKitchen = (props: RelevantKitchenProps) => {
    const {
        title,
        description,
        card1,
        card2,
        miniCardText1,
        miniCardText2,
        miniCardText3,
        ...othersProps
    } = props;
    return (
        <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr 1fr', xl: '1fr 1fr 2fr' }}
            gap={{ base: 4, xl: 6 }}
            paddingTop='24px'
            borderTop='1px solid'
            borderColor='blackAlpha.200'
            {...othersProps}
        >
            <GridItem fontSize='5xl' lineHeight='none' colSpan={{ base: 1, md: 3, lg: 1, xl: 2 }}>
                {title}
            </GridItem>
            <GridItem
                fontSize='md'
                colSpan={{ base: 1, md: 3, lg: 2, xl: 1 }}
                color='blackAlpha.600'
            >
                {description}
            </GridItem>

            <GridItem>
                <TextTagCard {...card1} />
            </GridItem>
            <GridItem>
                <TextTagCard {...card2} />
            </GridItem>

            <SimpleGrid columns={1} gap={3}>
                <TextCard text={miniCardText1} icon='Детские блюда' />
                <TextCard text={miniCardText2} icon='Национальные' />
                <TextCard text={miniCardText3} icon='Веганская кухня' />
            </SimpleGrid>
        </Grid>
    );
};
