import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import { NutritionValueType } from '~/entities/Recipe/model/types';

import { Nutrient } from './Nutrient';

interface NutrientsProps {
    nutritionValue: NutritionValueType;
}

export const Nutrients = ({ nutritionValue }: NutrientsProps) => {
    const { calories, carbohydrates, fats, proteins } = nutritionValue;
    return (
        <Box marginTop={{ base: '24px', lg: '40px' }}>
            <Text>* Калорийность на 1 порцию</Text>
            <SimpleGrid
                columns={{ base: 1, md: 4 }}
                gap={{ base: '12px', xl: '24px' }}
                marginTop={{ base: '12px', md: '20px' }}
            >
                <Nutrient title='калорийность' value={calories} measureUnit='ККАЛ' />
                <Nutrient title='белки' value={proteins} measureUnit='ГРАММ' />
                <Nutrient title='жиры' value={fats} measureUnit='ГРАММ' />
                <Nutrient title='углеводы' value={carbohydrates} measureUnit='ГРАММ' />
            </SimpleGrid>
        </Box>
    );
};
