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
import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

import { CreateRecipe } from '~/entities/Recipe';
import { useUploadImageMutation } from '~/shared/api/yeedaaApi';
import { BsFillImageFill } from '~/shared/ui/Icons';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';

import { BUTTONS, FORM_FIELDS, LABELS, PLACEHOLDERS } from './constants';
import { CookingSteps } from './CookingSteps';
import { ImageUploadModal } from './ImageUploadModal';
import { IngredientList } from './IngredientList';
import { LeaveConfirmModal } from './LeaveConfirmModal';
import { SubcategorySelect } from './SubcategorySelect';

export const RecipeForm = () => {
    const { errors, touched, values, setFieldValue, isSubmitting, dirty } =
        useFormikContext<CreateRecipe>();

    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [blockerProceed, setBlockerProceed] = useState<null | (() => void)>(null);

    const blocker = useBlocker(() => dirty);

    const [uploadImage, { isLoading }] = useUploadImageMutation();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imgUploadModal, setImgUploadModal] = useState<boolean>(false);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setLeaveModalOpen(true);
            setBlockerProceed(() => blocker.proceed);
        }
    }, [blocker, blocker.state]);

    const handleLeave = () => {
        setLeaveModalOpen(false);
        if (blockerProceed) blockerProceed();
    };

    const handleClose = () => {
        setLeaveModalOpen(false);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleImageSave = async () => {
        if (!imageFile) return;
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            const result = await uploadImage(imageFile).unwrap();
            setFieldValue(FORM_FIELDS.IMAGE, result.url);
            setImgUploadModal(false);
            setPreviewUrl(null);
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
        }
    };

    const handleRemoveImage = () => {
        setFieldValue(FORM_FIELDS.IMAGE, undefined);
        setPreviewUrl(null);
    };

    return (
        <>
            <LeaveConfirmModal
                isOpen={leaveModalOpen}
                onClose={handleClose}
                onLeave={handleLeave}
                onSave={() => {}}
            />
            <ImageUploadModal
                isOpen={imgUploadModal}
                onClose={() => setImgUploadModal(false)}
                onSave={handleImageSave}
                previewUrl={previewUrl}
                onFileChange={handleFileChange}
                isLoading={isLoading}
                onRemoveImage={handleRemoveImage}
                hasImage={!!imageFile}
            />
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
                        onClick={() => setImgUploadModal(true)}
                    >
                        {values.image ? (
                            <Image src={getImgUrlPath(values.image)} alt='Изображение рецепта' />
                        ) : (
                            <BsFillImageFill fontSize={48} />
                        )}
                    </Center>
                    <VStack w='100%' maxW='668px' gap='24px'>
                        <FormControl as={Flex} alignItems='center' justifyContent='space-between'>
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
        </>
    );
};
