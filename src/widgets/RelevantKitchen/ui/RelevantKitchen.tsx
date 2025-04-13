import { Grid, GridItem, GridProps, SimpleGrid } from '@chakra-ui/react';

import { KitchenTagType } from '~/shared/types/KitchenTagType';
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
    miniCardIcon1: KitchenTagType;
    miniCardText2: string;
    miniCardIcon2: KitchenTagType;
    miniCardText3: string;
    miniCardIcon3: KitchenTagType;
}

export const RelevantKitchen = (props: RelevantKitchenProps) => {
    const {
        title,
        description,
        card1,
        card2,
        miniCardText1,
        miniCardIcon1,
        miniCardText2,
        miniCardIcon2,
        miniCardText3,
        miniCardIcon3,
        ...othersProps
    } = props;
    return (
        <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr 1fr', xl: '1fr 1fr 2fr' }}
            rowGap={{ base: '12px', md: '16px', lg: '24px' }}
            columnGap={{ base: '16px', xl: '24px' }}
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

            <SimpleGrid columns={1} gap={{ base: '12px' }}>
                <TextCard text={miniCardText1} icon={miniCardIcon1} />
                <TextCard text={miniCardText2} icon={miniCardIcon2} />
                <TextCard text={miniCardText3} icon={miniCardIcon3} />
            </SimpleGrid>
        </Grid>
    );
};
