import { Button, Grid, Text } from '@chakra-ui/react';

import { kitchenIcons } from '~/shared/ui/KitchenIcons';
interface TextCardProps {
    icon: string;
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
            outline='1px solid'
            outlineColor='blackAlpha.200'
            borderRadius='8px'
        >
            <img src={kitchenIcons[icon]}></img>
            <Text
                fontWeight='medium'
                fontSize={{ base: 'md', lg: 'lg' }}
                noOfLines={1}
                wordBreak='break-all'
                style={{ wordWrap: 'break-word' }}
            >
                {text}
            </Text>
            <Button size={{ base: 'sm' }} variant='outline' colorScheme='lime'>
                Готовить
            </Button>
        </Grid>
    );
};
