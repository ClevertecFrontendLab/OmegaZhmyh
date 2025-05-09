import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import { NutritionValueType } from '~/entities/Recipe/types';

import { Nutrient } from './Nutrient';

type NutrientBlockProps = {
    nutritionValue: NutritionValueType;
};

export const NutrientBlock = ({ nutritionValue }: NutrientBlockProps) => {
    const { calories, carbohydrates, fats, protein } = nutritionValue;
    return (
        <Box marginTop={{ base: '24px', lg: '40px' }}>
            <Text>* Калорийность на 1 порцию</Text>
            <SimpleGrid
                columns={{ base: 1, md: 4 }}
                gap={{ base: '12px', xl: '24px' }}
                marginTop={{ base: '12px', md: '20px' }}
            >
                <Nutrient title='калорийность' value={calories} measureUnit='ККАЛ' />
                <Nutrient title='белки' value={protein} measureUnit='ГРАММ' />
                <Nutrient title='жиры' value={fats} measureUnit='ГРАММ' />
                <Nutrient title='углеводы' value={carbohydrates} measureUnit='ГРАММ' />
            </SimpleGrid>
        </Box>
    );
};
