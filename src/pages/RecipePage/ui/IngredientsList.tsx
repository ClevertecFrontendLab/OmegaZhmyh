import {
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

import { IngredientType } from '~/entities/Recipe/model/types';

interface IngredientsListProps {
    portions?: number;
    ingredients: IngredientType[];
}

export const IngredientsList = ({ ingredients, portions = 1 }: IngredientsListProps) => {
    const [numberOfServings, setNumberOfServings] = useState(1);
    return (
        <TableContainer marginTop={{ base: '24px', lg: '40px' }}>
            <Table variant='striped' colorScheme='blackAlpha'>
                <Thead>
                    <Tr>
                        <Th color='lime.600'>ИНГРЕДИЕНТЫ</Th>
                        <Th
                            isNumeric
                            display='flex'
                            justifyContent='end'
                            alignItems='center'
                            paddingRight={0}
                            gap={{ base: '12px', md: '16px' }}
                        >
                            <Text color='lime.600'>ПОРЦИЙ</Text>
                            <NumberInput
                                width='90px'
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
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map(({ title, count, measureUnit }, i) => (
                        <Tr>
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
