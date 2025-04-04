import { Button, Grid, Text } from '@chakra-ui/react';

import { kitchenIcons, KitchenTagType } from '~/shared/types/KitchenIcons';
interface TextCardProps {
    icon: KitchenTagType;
    text: string;
}

export const TextCard = (props: TextCardProps) => {
    const { text, icon } = props;
    return (
        <Grid templateColumns='auto 1fr auto' gap={2} alignItems='center'>
            <img src={kitchenIcons[icon]}></img>
            <Text fontWeight='medium' noOfLines={1}>
                {text}
            </Text>
            <Button variant='outline' colorScheme='lime'>
                Готовить
            </Button>
        </Grid>
    );
};
