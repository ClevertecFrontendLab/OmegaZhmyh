import { Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';
import { useState } from 'react';

import { StepType } from '~/entities/Recipe';
import { useUploadImageMutation } from '~/shared/api/yeedaaApi';
import { BsPlusCircleFill } from '~/shared/ui/Icons';

import { BUTTONS, FORM_FIELDS, LABELS } from './constants';
import { ImageUploadModal } from './ImageUploadModal';
import { StepItem } from './StepItem';

export const CookingSteps = () => {
    const { values, setFieldValue } = useFormikContext<{ steps: StepType[] }>();
    const steps = values[FORM_FIELDS.STEPS] || [];
    const [modalIdx, setModalIdx] = useState<number | null>(null);
    const [uploadImage, { isLoading }] = useUploadImageMutation();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
        if (!imageFile || modalIdx === null) return;
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            const result = await uploadImage(imageFile).unwrap();
            setFieldValue(`${FORM_FIELDS.STEPS}[${modalIdx}].image`, result.url);
            setModalIdx(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
        }
    };

    const handleModalClose = () => {
        setModalIdx(null);
        setImageFile(null);
        setPreviewUrl(null);
    };

    const handleRemoveImage = () => {
        if (modalIdx === null) return;
        setFieldValue(`${FORM_FIELDS.STEPS}[${modalIdx}].image`, undefined);
        setPreviewUrl(null);
    };

    return (
        <VStack align='stretch' gap={4} w='100%'>
            <Text fontSize='md' fontWeight='semibold'>
                {LABELS.STEPS}
            </Text>
            <FieldArray name={FORM_FIELDS.STEPS}>
                {({ push, remove }) => (
                    <>
                        {steps.map((step, idx) => (
                            <StepItem
                                key={idx}
                                step={step}
                                index={idx}
                                onImageClick={() => setModalIdx(idx)}
                                onRemove={() => remove(idx)}
                            />
                        ))}
                        <HStack justifyContent='end'>
                            <Button
                                mt={4}
                                leftIcon={<Icon as={BsPlusCircleFill} />}
                                variant='outline'
                                colorScheme='gray'
                                onClick={() => push({ description: '', image: undefined })}
                            >
                                {BUTTONS.NEW_STEP}
                            </Button>
                        </HStack>
                    </>
                )}
            </FieldArray>

            <ImageUploadModal
                isOpen={modalIdx !== null}
                onClose={handleModalClose}
                onSave={handleImageSave}
                previewUrl={previewUrl}
                onFileChange={handleFileChange}
                isLoading={isLoading}
                onRemoveImage={handleRemoveImage}
                hasImage={!!steps[modalIdx ?? 0]?.image}
            />
        </VStack>
    );
};
