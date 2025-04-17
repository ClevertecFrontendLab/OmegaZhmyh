import { Square, Text, VStack } from '@chakra-ui/react';

interface NutrientProps {
    title: string;
    value: number;
    measureUnit: string;
}

export const Nutrient = (nutrient: NutrientProps) => {
    const { title, value, measureUnit } = nutrient;
    return (
        <Square
            padding='16px'
            border='1px solid'
            borderColor='blackAlpha.200'
            borderRadius='16px'
            bgColor='white'
        >
            <VStack gap={0}>
                <Text color='blackAlpha.600' fontSize='sm'>
                    {title}
                </Text>
                <Text color='lime.800' fontSize='4xl' fontWeight='medium'>
                    {value}
                </Text>
                <Text color='blackAlpha.900' fontSize='sm' fontWeight='semibold'>
                    {measureUnit}
                </Text>
            </VStack>
        </Square>
    );
};
