import { Box, SimpleGrid, Text } from '@chakra-ui/react';

type NutrientProps = {
    title: string;
    value: number;
    measureUnit: string;
};

export const Nutrient = (nutrient: NutrientProps) => {
    const { title, value, measureUnit } = nutrient;
    return (
        <SimpleGrid
            columns={{ base: 3, md: 1 }}
            alignItems='center'
            justifyItems='center'
            height={{ base: '64px', md: '136px' }}
            padding={{ base: '16px 12px', md: '16px 16px' }}
            border='1px solid'
            borderColor='blackAlpha.200'
            borderRadius='16px'
            bgColor='white'
            gap={{ base: '4px', md: '12px' }}
        >
            <Text
                color='blackAlpha.600'
                fontSize='sm'
                justifySelf={{ base: 'start', md: 'center' }}
            >
                {title}
            </Text>
            <Box
                color='lime.800'
                fontSize={{ base: '2xl', md: '4xl' }}
                lineHeight={1}
                fontWeight='medium'
                justifySelf={{ base: 'end', md: 'center' }}
                width={{ base: '60px', md: 'auto' }}
                textAlign='center'
            >
                {value}
            </Box>
            <Text color='blackAlpha.900' fontSize={{ base: 'xs', md: 'sm' }} fontWeight='semibold'>
                {measureUnit}
            </Text>
        </SimpleGrid>
    );
};
