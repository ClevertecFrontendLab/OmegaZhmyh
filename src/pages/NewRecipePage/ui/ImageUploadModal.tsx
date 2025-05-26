import { Button, Center, Image, Input, Text, VStack } from '@chakra-ui/react';

import { BsFillImageFill } from '~/shared/ui/Icons';
import { ModalNotification } from '~/shared/ui/ModalNotification';

import { ImageUploadModalProps } from './types';

export const ImageUploadModal = ({
    isOpen,
    onClose,
    onSave,
    previewUrl,
    onFileChange,
    isLoading,
    onRemoveImage,
    hasImage,
}: ImageUploadModalProps) => (
    <ModalNotification isOpen={isOpen} onClose={onClose}>
        <VStack p={6} minW='260px'>
            <Text fontWeight='bold' mb={2}>
                Изображение
            </Text>
            {previewUrl ? (
                <Image src={previewUrl} alt='Загруженное фото' maxH='160px' mb={2} />
            ) : (
                <Center bg='gray.100' w='120px' h='120px' borderRadius='8px'>
                    <BsFillImageFill fontSize={32} />
                </Center>
            )}
            <Input type='file' accept='image/*' onChange={onFileChange} isDisabled={isLoading} />
            {hasImage && (
                <Button colorScheme='red' variant='ghost' size='sm' onClick={onRemoveImage}>
                    Удалить фото
                </Button>
            )}
            <Button colorScheme='blackAlpha' onClick={onSave} isLoading={isLoading} w='100%' mt={2}>
                Сохранить
            </Button>
        </VStack>
    </ModalNotification>
);
