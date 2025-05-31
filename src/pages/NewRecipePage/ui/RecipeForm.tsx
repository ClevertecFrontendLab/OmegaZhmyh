import {
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Icon,
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
import { Field, FieldProps, Form, useFormikContext } from 'formik';

import { CreateRecipe } from '~/entities/Recipe';
import { BiEditAlt, BsFillImageFill } from '~/shared/ui/Icons';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';

import { useImageInput } from '../lib/useImageInput';
import { useRecipeForm } from '../model/useRecipeForm';
import { BUTTONS, FORM_FIELDS, PLACEHOLDERS } from './constants';
import { CookingSteps } from './CookingSteps';
import { IngredientList } from './IngredientList';
import { SubcategorySelect } from './SubcategorySelect';

type RecipeFormProps = {
    onDraftSave: (values: CreateRecipe) => Promise<void>;
    onSave: (values: CreateRecipe) => Promise<void>;
    isEdit: boolean;
    handleUpdateRecipe: (values: CreateRecipe) => Promise<void>;
};

export const RecipeForm = ({
    onDraftSave,
    onSave,
    isEdit,
    handleUpdateRecipe,
}: RecipeFormProps) => {
    const { values, errors } = useFormikContext<CreateRecipe>();
    const { modal, openImageUploader } = useImageInput();
    const { handleDraftSave, handlePublish, handleUpdate } = useRecipeForm({
        onDraftSave,
        onSave,
        isEdit,
        handleUpdateRecipe,
    });

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
                        border={errors[FORM_FIELDS.IMAGE] ? '1px solid red' : 'none'}
                        onClick={() =>
                            openImageUploader(FORM_FIELDS.IMAGE, 'recipe-image-block-input-file')
                        }
                        data-test-id='recipe-image-block'
                    >
                        {values.image ? (
                            <Image
                                src={getImgUrlPath(values.image)}
                                alt='Изображение рецепта'
                                boxSize='100%'
                                objectFit='contain'
                                data-test-id='recipe-image-block-preview-image'
                            />
                        ) : (
                            <BsFillImageFill boxSize='32px' />
                        )}
                    </Center>
                    <VStack w='100%' maxW='668px' gap='24px'>
                        <FormControl
                            as={Flex}
                            gap='16px'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <FormLabel fontSize='md' fontWeight='semibold' margin='0'>
                                Выберите не менее 3-х тегов
                            </FormLabel>
                            <SubcategorySelect />
                        </FormControl>
                        <Field
                            as={Input}
                            name={FORM_FIELDS.TITLE}
                            placeholder={PLACEHOLDERS.TITLE}
                            isInvalid={!!errors[FORM_FIELDS.TITLE]}
                            size='lg'
                            fontSize='lg'
                            color='blackAlpha.900'
                            _placeholder={{ color: 'blackAlpha.700' }}
                            borderColor='lime.150'
                            mt={{ base: '0', lg: '12px' }}
                            data-test-id='recipe-title'
                        />
                        <Field
                            as={Textarea}
                            name={FORM_FIELDS.DESCRIPTION}
                            placeholder={PLACEHOLDERS.DESCRIPTION}
                            isInvalid={!!errors[FORM_FIELDS.DESCRIPTION]}
                            color='blackAlpha.900'
                            _placeholder={{ color: 'blackAlpha.700' }}
                            fontSize='sm'
                            data-test-id='recipe-description'
                        />
                        <FormControl
                            as={Flex}
                            alignItems='center'
                            justifyContent={{ base: 'space-between', md: 'flex-start' }}
                            isInvalid={!!errors[FORM_FIELDS.PORTIONS]}
                            gap={{ base: '16px', lg: '24px' }}
                        >
                            <FormLabel
                                fontSize={{ base: 'sm', md: 'md' }}
                                fontWeight='semibold'
                                margin='0'
                            >
                                На сколько человек ваш рецепт?
                            </FormLabel>
                            <Field name={FORM_FIELDS.PORTIONS}>
                                {({ field, form }: FieldProps<number>) => (
                                    <NumberInput
                                        w='90px'
                                        minW='90px'
                                        onChange={(val) =>
                                            form.setFieldValue(
                                                field.name,
                                                val === '' || val === '-' ? undefined : Number(val),
                                            )
                                        }
                                        value={field.value}
                                        min={-10}
                                    >
                                        <NumberInputField data-test-id='recipe-portions' />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl
                            as={Flex}
                            alignItems='center'
                            justifyContent={{ base: 'space-between', md: 'flex-start' }}
                            isInvalid={!!errors[FORM_FIELDS.TIME]}
                            gap={{ base: '16px', lg: '24px' }}
                        >
                            <FormLabel
                                fontSize={{ base: 'sm', md: 'md' }}
                                fontWeight='semibold'
                                margin='0'
                            >
                                Сколько времени готовить в минутах?
                            </FormLabel>
                            <Field name={FORM_FIELDS.TIME}>
                                {({ field, form }: FieldProps) => (
                                    <NumberInput
                                        w='90px'
                                        minW='90px'
                                        onChange={(val) =>
                                            form.setFieldValue(
                                                field.name,
                                                val === '' || val === '-' ? undefined : Number(val),
                                            )
                                        }
                                        value={field.value}
                                        min={-10}
                                    >
                                        <NumberInputField data-test-id='recipe-time' />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                        </FormControl>
                    </VStack>
                </Flex>
                <Container maxW='668px' mt='40px' pb={{ base: '16px', lg: '32px' }} px='0'>
                    <VStack gap={{ base: '32px', lg: '40px' }}>
                        <IngredientList />
                        <CookingSteps openImageUploader={openImageUploader} />

                        <Flex
                            justifyContent='center'
                            gap='20px'
                            w='100%'
                            flexDirection={{ base: 'column', md: 'row' }}
                            alignItems={{ base: 'stretch', md: 'center' }}
                        >
                            <Button
                                size='lg'
                                variant='outline'
                                colorScheme='gray'
                                leftIcon={<Icon as={BiEditAlt} />}
                                borderColor='black'
                                data-test-id='recipe-save-draft-button'
                                onClick={handleDraftSave}
                            >
                                {BUTTONS.SAVE_DRAFT}
                            </Button>
                            <Button
                                size='lg'
                                colorScheme='blackAlpha'
                                bg='black'
                                color='white'
                                onClick={isEdit ? handleUpdate : handlePublish}
                                data-test-id='recipe-publish-recipe-button'
                            >
                                {BUTTONS.PUBLISH}
                            </Button>
                        </Flex>
                    </VStack>
                </Container>
            </Form>
        </>
    );
};
