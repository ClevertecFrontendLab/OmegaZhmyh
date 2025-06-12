import { Box, Grid, HStack, Icon, IconButton, Input, Select, Text, VStack } from '@chakra-ui/react';
import { Field, FieldArray, FormikErrors, useFormikContext } from 'formik';

import { CreateRecipe, IngredientType } from '~/entities/recipe';
import { MeasureUnit, useGetMeasureUnitsQuery } from '~/shared/api';
import { BsPlusCircle, BsPlusCircleFill, BsTrash } from '~/shared/ui/icon';

import { FORM_FIELDS, PLACEHOLDERS } from './constants';

export const IngredientList = () => {
    const { values, errors } = useFormikContext<CreateRecipe>();
    const { data: measureUnits } = useGetMeasureUnitsQuery();
    const ingredientErrors = errors[FORM_FIELDS.INGREDIENTS] as
        | FormikErrors<IngredientType>[]
        | undefined;

    return (
        <VStack align='stretch' w='100%' gap='16px'>
            <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight='semibold'>
                Добавьте ингредиенты рецепта, нажав на <Icon as={BsPlusCircle} color='black' />
            </Text>
            <HStack justifyContent='start' w='100%' display={{ base: 'none', md: 'flex' }}>
                <Box padding='4px 24px' minW='295px'>
                    <Text color='lime.600' fontSize='xs' fontWeight='bold'>
                        Ингредиент
                    </Text>
                </Box>
                <Box paddingY='4px' minW='125px'>
                    <Text color='lime.600' fontSize='xs' fontWeight='bold'>
                        Количество
                    </Text>
                </Box>
                <Box padding='4px 18px' minW='166px'>
                    <Text color='lime.600' fontSize='xs' fontWeight='bold'>
                        Единица измерения
                    </Text>
                </Box>
            </HStack>
            <FieldArray name='ingredients'>
                {({ push, remove }) => (
                    <>
                        {values.ingredients &&
                            values.ingredients.map((_: IngredientType, idx: number) => (
                                <Grid
                                    key={idx}
                                    templateColumns={{
                                        base: '80px 1fr 32px',
                                        md: '1fr 80px 215px 32px',
                                    }}
                                    templateAreas={{
                                        base: `
                                            "title title title"
                                            "count measure delete"
                                        `,
                                        md: `"title count measure delete"`,
                                    }}
                                    gap={{ base: '12px', lg: '16px' }}
                                    w='100%'
                                >
                                    <Field
                                        as={Input}
                                        name={`ingredients[${idx}].title`}
                                        placeholder={PLACEHOLDERS.INGREDIENT}
                                        gridArea='title'
                                        color='blackAlpha.900'
                                        _placeholder={{ color: 'blackAlpha.700' }}
                                        isInvalid={!!ingredientErrors?.[idx]?.title}
                                        data-test-id={`recipe-ingredients-title-${idx}`}
                                    />
                                    <Field
                                        as={Input}
                                        name={`ingredients[${idx}].count`}
                                        placeholder={PLACEHOLDERS.INGREDIENT_COUNT}
                                        type='number'
                                        gridArea='count'
                                        color='blackAlpha.900'
                                        _placeholder={{ color: 'blackAlpha.700' }}
                                        isInvalid={!!ingredientErrors?.[idx]?.count}
                                        data-test-id={`recipe-ingredients-count-${idx}`}
                                    />
                                    <Field
                                        as={Select}
                                        name={`ingredients[${idx}].measureUnit`}
                                        placeholder={PLACEHOLDERS.MEASURE_UNIT}
                                        gridArea='measure'
                                        color='blackAlpha.900'
                                        _placeholder={{ color: 'blackAlpha.700' }}
                                        textOverflow='ellipsis'
                                        overflow='hidden'
                                        whiteSpace='nowrap'
                                        isInvalid={!!ingredientErrors?.[idx]?.measureUnit}
                                        data-test-id={`recipe-ingredients-measureUnit-${idx}`}
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
                                        w='32px'
                                        variant='ghost'
                                        gridArea='delete'
                                        onClick={() => remove(idx)}
                                        data-test-id={`recipe-ingredients-remove-ingredients-${idx}`}
                                        isDisabled={values.ingredients.length === 1}
                                    />
                                </Grid>
                            ))}
                        <Grid
                            templateColumns={{ base: '80px 1fr 32px', md: '1fr 80px 215px 32px' }}
                            templateAreas={{
                                base: `
                                            "title title title"
                                            "count measure delete"
                                        `,
                                md: `"title count measure delete"`,
                            }}
                            gap={{ base: '12px', lg: '16px' }}
                            w='100%'
                        >
                            <Input
                                placeholder={PLACEHOLDERS.INGREDIENT}
                                isDisabled
                                gridArea='title'
                            />
                            <Input
                                placeholder={PLACEHOLDERS.INGREDIENT_COUNT}
                                isDisabled
                                gridArea='count'
                            />
                            <Input
                                placeholder={PLACEHOLDERS.MEASURE_UNIT}
                                isDisabled
                                gridArea='measure'
                            />
                            <IconButton
                                aria-label='Добавить ингредиент'
                                icon={<BsPlusCircleFill boxSize='32px' />}
                                w='32px'
                                variant='ghost'
                                color='black'
                                gridArea='delete'
                                onClick={() => push({ title: '', count: 1, measureUnit: '' })}
                                data-test-id='recipe-ingredients-add-ingredients'
                            />
                        </Grid>
                    </>
                )}
            </FieldArray>
        </VStack>
    );
};
