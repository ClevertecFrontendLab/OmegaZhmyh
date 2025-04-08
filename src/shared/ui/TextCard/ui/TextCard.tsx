import { Button, Grid, Text } from '@chakra-ui/react';

import { kitchenIcons, KitchenTagType } from '~/shared/ui/KitchenIcons';
interface TextCardProps {
    icon: KitchenTagType;
    text: string;
}

export const TextCard = (props: TextCardProps) => {
    const { text, icon } = props;
    return (
        <Grid
            templateColumns='auto 1fr auto'
            gap={2}
            alignItems='center'
            padding={{ xl: '12px 24px', base: '10px 12px' }}
            border='1px solid'
            borderColor='blackAlpha.200'
            borderRadius='8px'
        >
            <img src={kitchenIcons[icon]}></img>
            <Text fontWeight='medium' fontSize='lg' noOfLines={1}>
                {text}
            </Text>
            <Button size={{ base: 'sm' }} variant='outline' colorScheme='lime'>
                Готовить
            </Button>
        </Grid>
    );
};
