import {
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { Field, Form, useFormikContext } from 'formik';

import { CreateRecipe } from '~/entities/Recipe';
import { BsFillImageFill } from '~/shared/ui/Icons';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';

import { useImageInput } from '../lib/useImageInput';
import { BUTTONS, FORM_FIELDS, LABELS, PLACEHOLDERS } from './constants';
import { CookingSteps } from './CookingSteps';
import { IngredientList } from './IngredientList';
import { SubcategorySelect } from './SubcategorySelect';

export const RecipeForm = ({ onDraftSave }: { onDraftSave: () => void }) => {
    const { values, setFieldValue, isSubmitting, isValid } = useFormikContext<CreateRecipe>();
    const { modal, openImageUploader } = useImageInput();

    return (
        <>
            {modal}
            <Form data-test-id='recipe-form'>
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
                        border={!isValid ? '1px solid red' : 'none'}
                        onClick={() =>
                            openImageUploader(FORM_FIELDS.IMAGE, 'recipe-image-block-input-file')
                        }
                        data-test-id='recipe-image-block'
                    >
                        {values.image ? (
                            <Image
                                src={getImgUrlPath(values.image)}
                                alt='Изображение рецепта'
                                data-test-id='recipe-image-block-preview-image'
                            />
                        ) : (
                            <BsFillImageFill fontSize={48} />
                        )}
                    </Center>
                    <VStack w='100%' maxW='668px' gap='24px'>
                        <FormControl
                            as={Flex}
                            alignItems='center'
                            justifyContent='space-between'
                            isInvalid={!isValid}
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
                            isInvalid={!isValid}
                            mt={{ base: '0', lg: '12px' }}
                            data-test-id='recipe-title'
                        />
                        <Field
                            as={Textarea}
                            name={FORM_FIELDS.DESCRIPTION}
                            placeholder={PLACEHOLDERS.DESCRIPTION}
                            isInvalid={!isValid}
                            data-test-id='recipe-description'
                        />
                        <FormControl as={Flex} alignItems='center' isInvalid={!isValid}>
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
                                <NumberInputField data-test-id='recipe-portions' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl as={Flex} alignItems='center' isInvalid={!isValid}>
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
                                <NumberInputField data-test-id='recipe-time' />
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
                        <CookingSteps openImageUploader={openImageUploader} />

                        <HStack justifyContent='center' mt={8} spacing={6}>
                            <Button
                                variant='outline'
                                colorScheme='gray'
                                data-test-id='recipe-save-draft-button'
                                onClick={onDraftSave}
                            >
                                {BUTTONS.SAVE_DRAFT}
                            </Button>
                            <Button
                                colorScheme='blackAlpha'
                                bg='black'
                                color='white'
                                type='submit'
                                isLoading={isSubmitting}
                                data-test-id='recipe-publish-recipe-button'
                            >
                                {BUTTONS.PUBLISH}
                            </Button>
                        </HStack>
                    </VStack>
                </Container>
            </Form>
        </>
    );
};
