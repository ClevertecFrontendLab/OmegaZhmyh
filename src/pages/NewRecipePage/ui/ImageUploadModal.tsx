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
}: ImageUploadModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <ModalNotification isOpen={isOpen} onClose={onClose}>
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
                    />
                ) : (
                    <Center
                        bg='gray.100'
                        boxSize={{ base: '108px', lg: '206px' }}
                        borderRadius='8px'
                        cursor='pointer'
                        onClick={handleImageClick}
                        _hover={{ bg: 'gray.200' }}
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
                />
                {hasImage && (
                    <Button colorScheme='red' variant='ghost' size='sm' onClick={onRemoveImage}>
                        Удалить фото
                    </Button>
                )}
                {previewUrl && (
                    <Button
                        bgColor='black'
                        color='white'
                        onClick={onSave}
                        isLoading={isLoading}
                        w='100%'
                        mt={2}
                    >
                        Сохранить
                    </Button>
                )}
            </VStack>
        </ModalNotification>
    );
};
