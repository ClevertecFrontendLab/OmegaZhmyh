import { Grid, GridItem, GridProps, SimpleGrid } from '@chakra-ui/react';

import { TextCard } from '~/shared/ui/TextCard';
import {
    TextTagDecsCard,
    TextTagDecsCardProps,
} from '~/shared/ui/TextTagDecsCard/ui/TextTagDecsCard';

interface RelevantKitchenProps extends GridProps {
    title: string;
    description: string;
    card1: TextTagDecsCardProps;
    card2: TextTagDecsCardProps;
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
            gap={{ base: 3, xl: 6 }}
            /* paddingTop={{ base: '8px', md: '24px' }} */
            borderTop='1px solid'
            borderColor='blackAlpha.200'
            padding={{ base: '8px 0 16px 0', lg: '24px 0 0 0' }}
            {...othersProps}
        >
            <GridItem
                fontSize={{ base: '2xl', lg: '4xl' }}
                fontWeight='medium'
                colSpan={{ base: 1, md: 3, lg: 1, xl: 2 }}
                lineHeight={{ base: '32px' }}
            >
                {title}
            </GridItem>
            <GridItem
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='medium'
                lineHeight='20px'
                colSpan={{ base: 1, md: 3, lg: 2, xl: 1 }}
                color='blackAlpha.600'
            >
                {description}
            </GridItem>

            <TextTagDecsCard {...card1} />
            <TextTagDecsCard {...card2} />

            <SimpleGrid columns={1} gap={3}>
                <TextCard text={miniCardText1} icon='Детские блюда' />
                <TextCard text={miniCardText2} icon='Национальные' />
                <TextCard text={miniCardText3} icon='Веганская кухня' />
            </SimpleGrid>
        </Grid>
    );
};
