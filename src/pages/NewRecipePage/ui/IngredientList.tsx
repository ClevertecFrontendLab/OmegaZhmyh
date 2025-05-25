import { HStack, Icon, IconButton, Input, Select, Text, VStack } from '@chakra-ui/react';
import { Field, FieldArray, useFormikContext } from 'formik';

import { CreateRecipe, IngredientType } from '~/entities/Recipe';
import { MeasureUnit } from '~/shared/api/types';
import { useGetMeasureUnitsQuery } from '~/shared/api/yeedaaApi';
import { BsPlusCircle, BsPlusCircleFill, BsTrash } from '~/shared/ui/Icons';

export const IngredientList = () => {
    const { values } = useFormikContext<CreateRecipe>();
    const { data: measureUnits } = useGetMeasureUnitsQuery();

    return (
        <VStack align='stretch' w='100%'>
            <Text fontSize='md' fontWeight='semibold'>
                Добавьте ингредиенты рецепта, нажав на <Icon as={BsPlusCircle} color='black' />
            </Text>
            <FieldArray name='ingredients'>
                {({ push, remove }) => (
                    <>
                        <HStack justifyContent='space-around' w='100%'>
                            <Text color='lime.600' fontSize='xs' fontWeight='bold'>
                                Ингредиент
                            </Text>
                            <Text color='lime.600' fontSize='xs' fontWeight='bold'>
                                Количество
                            </Text>
                            <Text color='lime.600' fontSize='xs' fontWeight='bold'>
                                Единица измерения
                            </Text>
                        </HStack>
                        {values.ingredients &&
                            values.ingredients.map((_: IngredientType, idx: number) => (
                                <HStack spacing={4} mb={2} key={idx}>
                                    <Field
                                        as={Input}
                                        name={`ingredients[${idx}].title`}
                                        placeholder='Ингредиент'
                                    />
                                    <Field
                                        as={Input}
                                        name={`ingredients[${idx}].count`}
                                        placeholder='100'
                                        maxW='80px'
                                        type='number'
                                    />
                                    <Field
                                        as={Select}
                                        name={`ingredients[${idx}].measureUnit`}
                                        placeholder='Единица измерения'
                                        maxW='215px'
                                    >
                                        {measureUnits?.map((unit: MeasureUnit) => (
                                            <option key={unit._id} value={unit.name}>
                                                {unit.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <IconButton
                                        aria-label='Удалить ингредиент'
                                        icon={<BsTrash boxSize='14px' />}
                                        color='lime.600'
                                        boxSize='32px'
                                        onClick={() => remove(idx)}
                                    />
                                </HStack>
                            ))}
                        <HStack>
                            <Input placeholder='Ингредиент' isDisabled />
                            <Input placeholder='100' isDisabled maxW='80px' />
                            <Input placeholder='Единица измерения' isDisabled maxW='215px' />
                            <IconButton
                                aria-label='Добавить ингредиент'
                                icon={<BsPlusCircleFill boxSize='32px' />}
                                boxSize='32px'
                                color='black'
                                onClick={() => push({ title: '', count: 1, measureUnit: '' })}
                            />
                        </HStack>
                    </>
                )}
            </FieldArray>
        </VStack>
    );
};
