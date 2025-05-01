import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

import { IngredientType } from '~/shared/api/types';

interface IngredientsListProps {
    portions?: number;
    ingredients: IngredientType[];
}

export const IngredientsList = ({ ingredients, portions = 1 }: IngredientsListProps) => {
    const [numberOfServings, setNumberOfServings] = useState(portions);
    return (
        <TableContainer marginTop={{ base: '24px', lg: '40px' }}>
            <Table variant='striped' colorScheme='blackAlpha' maxWidth='100%'>
                <Thead>
                    <Tr>
                        <Th color='lime.600'>ИНГРЕДИЕНТЫ</Th>
                        <Th isNumeric paddingRight={0}>
                            <Flex
                                justifyContent='end'
                                alignItems='center'
                                gap={{ base: '12px', md: '16px' }}
                            >
                                <Text color='lime.600'>ПОРЦИЙ</Text>
                                <NumberInput
                                    size='md'
                                    maxWidth={{ base: '73px', md: '90px' }}
                                    value={numberOfServings}
                                    onChange={(_, num) => setNumberOfServings(num)}
                                    defaultValue={1}
                                    min={1}
                                    fontSize='md'
                                    fontWeight='normal'
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper data-test-id='increment-stepper' />
                                        <NumberDecrementStepper data-test-id='decrement-stepper' />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map(({ title, count, measureUnit }, i) => (
                        <Tr key={title}>
                            <Td fontWeight='medium'>{title}</Td>
                            <Td
                                isNumeric
                                data-test-id={`ingredient-quantity-${i}`}
                            >{`${count ? (count / portions) * numberOfServings : ''} ${measureUnit}`}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
