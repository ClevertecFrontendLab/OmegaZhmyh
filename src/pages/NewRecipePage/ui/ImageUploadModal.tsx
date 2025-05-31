import { Button, Center, Image, Input, Text, VStack } from '@chakra-ui/react';
import { useRef } from 'react';

import { BsFillImageFill } from '~/shared/ui/Icons';
import { ModalNotification } from '~/shared/ui/ModalNotification';

export interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    previewUrl: string | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    onRemoveImage: () => void;
    hasImage: boolean;
    inputDataTestId: string;
}

export const ImageUploadModal = ({
    isOpen,
    onClose,
    onSave,
    previewUrl,
    onFileChange,
    isLoading,
    onRemoveImage,
    hasImage,
    inputDataTestId,
}: ImageUploadModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <ModalNotification isOpen={isOpen} onClose={onClose} dataTestId='recipe-image-modal'>
            <VStack>
                <Text fontWeight='bold' fontSize='2xl'>
                    Изображение
                </Text>
                {previewUrl ? (
                    <Image
                        src={previewUrl}
                        alt='Загруженное фото'
                        boxSize={{ base: '108px', lg: '206px' }}
                        cursor='pointer'
                        onClick={handleImageClick}
                        data-test-id='recipe-image-modal-preview-image'
                    />
                ) : (
                    <Center
                        bg='gray.100'
                        boxSize={{ base: '108px', lg: '206px' }}
                        borderRadius='8px'
                        cursor='pointer'
                        onClick={handleImageClick}
                        _hover={{ bg: 'gray.200' }}
                        data-test-id='recipe-image-modal-image-block'
                    >
                        <BsFillImageFill fontSize={32} />
                    </Center>
                )}
                <Input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={onFileChange}
                    isDisabled={isLoading}
                    display='none'
                    data-test-id={inputDataTestId}
                />
                {hasImage && (
                    <Button variant='ghost' mt='16px' size='lg' onClick={onRemoveImage}>
                        Удалить
                    </Button>
                )}
                {previewUrl && (
                    <Button
                        bgColor='black'
                        color='white'
                        onClick={onSave}
                        isLoading={isLoading}
                        w='100%'
                        mt='32px'
                    >
                        Сохранить
                    </Button>
                )}
            </VStack>
        </ModalNotification>
    );
};
