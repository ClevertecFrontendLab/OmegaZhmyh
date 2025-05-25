import {
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';

import { CreateRecipe } from '~/entities/Recipe';
import { useCreateRecipeMutation } from '~/entities/Recipe/api/recipeApi';
import { BsFillImageFill } from '~/shared/ui/Icons';

import { validationSchema } from '../model/validationSchema';
import { BUTTONS, FORM_FIELDS, LABELS, PLACEHOLDERS } from './constants';
import { CookingSteps } from './CookingSteps';
import { IngredientList } from './IngredientList';
import { SubcategorySelect } from './SubcategorySelect';

const initialValues: CreateRecipe = {
    title: '',
    description: '',
    time: '0',
    image: undefined,
    categoriesIds: [],
    steps: [],
    ingredients: [],
    meat: undefined,
    garnish: undefined,
    portions: 1,
};

export const NewRecipePage = () => {
    const navigate = useNavigate();
    const [createRecipe] = useCreateRecipeMutation();

    const handleSubmit = async (
        values: CreateRecipe,
        { setSubmitting }: FormikHelpers<CreateRecipe>,
    ) => {
        try {
            await createRecipe(values).unwrap();
            navigate('/recipes');
        } catch (error) {
            console.error('Failed to create recipe:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values, isSubmitting, errors, touched }) => (
                <Form>
                    <Flex
                        alignItems='flex-start'
                        mt={{ base: '40px', lg: '56px' }}
                        gap={{ base: '16px', lg: '24px' }}
                        flexDirection={{ base: 'column', md: 'row' }}
                    >
                        <Center
                            bg='rgba(0, 0, 0, 0.08)'
                            w={{ base: '100%', md: '232px', lg: '353px', xl: '553px' }}
                            h={{ base: '224px', lg: '410px' }}
                            borderRadius='8px'
                        >
                            <BsFillImageFill fontSize={48} />
                        </Center>
                        <VStack w='100%' maxW='668px' gap='24px'>
                            <FormControl
                                as={Flex}
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <FormLabel fontSize='md' fontWeight='semibold'>
                                    {LABELS.CATEGORIES}
                                </FormLabel>
                                <SubcategorySelect />
                            </FormControl>
                            <Field
                                as={Input}
                                name={FORM_FIELDS.TITLE}
                                placeholder={PLACEHOLDERS.TITLE}
                                isInvalid={!!errors.title && touched.title}
                                mt={{ base: '0', lg: '12px' }}
                            />
                            <Field
                                as={Textarea}
                                name={FORM_FIELDS.DESCRIPTION}
                                placeholder={PLACEHOLDERS.DESCRIPTION}
                                isInvalid={!!errors.description && touched.description}
                            />
                            <FormControl
                                as={Flex}
                                alignItems='center'
                                isInvalid={!!errors.portions && touched.portions}
                            >
                                <FormLabel fontSize='md' fontWeight='semibold'>
                                    {LABELS.PORTIONS}
                                </FormLabel>
                                <NumberInput
                                    w='100px'
                                    min={1}
                                    value={values.portions || ''}
                                    onChange={(val) =>
                                        setFieldValue(
                                            FORM_FIELDS.PORTIONS,
                                            val ? Number(val) : undefined,
                                        )
                                    }
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl
                                as={Flex}
                                alignItems='center'
                                isInvalid={!!errors.time && touched.time}
                            >
                                <FormLabel fontSize='md' fontWeight='semibold'>
                                    {LABELS.TIME}
                                </FormLabel>
                                <NumberInput
                                    w='100px'
                                    min={0}
                                    value={values.time}
                                    onChange={(val) =>
                                        setFieldValue(FORM_FIELDS.TIME, val ? Number(val) : 0)
                                    }
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </VStack>
                    </Flex>
                    <Container maxW='668px' mt='40px' padding={0}>
                        <VStack gap={{ base: '32px', lg: '40px' }}>
                            <IngredientList />
                            <CookingSteps />

                            <HStack justifyContent='center' mt={8} spacing={6}>
                                <Button variant='outline' colorScheme='gray'>
                                    {BUTTONS.SAVE_DRAFT}
                                </Button>
                                <Button
                                    colorScheme='blackAlpha'
                                    bg='black'
                                    color='white'
                                    type='submit'
                                    isLoading={isSubmitting}
                                >
                                    {BUTTONS.PUBLISH}
                                </Button>
                            </HStack>
                        </VStack>
                    </Container>
                </Form>
            )}
        </Formik>
    );
};
