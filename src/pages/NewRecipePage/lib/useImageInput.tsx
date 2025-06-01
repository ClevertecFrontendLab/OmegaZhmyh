import { useFormikContext } from 'formik';
import { useState } from 'react';

import { CreateRecipe } from '~/entities/Recipe';
import { useUploadImageMutation } from '~/shared/api/yeedaaApi';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';

import { ImageUploadModal } from '../ui/ImageUploadModal';

export const useImageInput = () => {
    const { setFieldValue, values } = useFormikContext<CreateRecipe>();

    const [fieldName, setFieldName] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [inputDataTestId, setInputDataTestId] = useState<string>('');
    const [isImgModalOpen, setImgModalOpen] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [uploadImage, { isLoading }] = useUploadImageMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!imageFile || !fieldName) return;
        try {
            const result = await uploadImage(imageFile).unwrap();
            setFieldValue(fieldName, result.url);
            handleCloseModal();
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
        }
    };

    const handleRemoveImage = () => {
        if (!fieldName) return;
        setFieldValue(fieldName, null);
        setPreviewUrl(null);
        handleCloseModal();
    };

    const openImageUploader = (fieldName: string, inputDataTestId: string) => {
        setFieldName(fieldName);
        setInputDataTestId(inputDataTestId);

        const path = fieldName.split('.');
        let currentImageUrl: string | undefined | null;

        if (path[0] === 'steps') {
            const stepIndex = parseInt(path[1]);
            currentImageUrl = values.steps[stepIndex]?.image;
        } else {
            currentImageUrl = values[path[0] as keyof CreateRecipe] as string | undefined;
        }

        if (currentImageUrl) {
            setPreviewUrl(getImgUrlPath(currentImageUrl));
        } else {
            setPreviewUrl(null);
        }

        setImgModalOpen(true);
    };

    const handleCloseModal = () => {
        setImgModalOpen(false);
        setPreviewUrl(null);
        setImageFile(null);
    };

    const modal = (
        <ImageUploadModal
            isOpen={isImgModalOpen}
            onClose={handleCloseModal}
            onSave={handleImageSave}
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
            isLoading={isLoading}
            onRemoveImage={handleRemoveImage}
            hasImage={!!imageFile || !!previewUrl}
            inputDataTestId={inputDataTestId}
        />
    );

    return {
        modal,
        openImageUploader,
    };
};
