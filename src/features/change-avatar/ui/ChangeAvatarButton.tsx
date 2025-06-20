import { Box, Button, IconButton, Input, Text, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { useUploadAvatarMutation } from '~/entities/user';
import { BsImageFill } from '~/shared/ui/icon';
import { ModalNotification } from '~/shared/ui/modal-notification';

import { getCroppedImg } from '../model/cropImg';

export const ChangeAvatarButton = ({
    imageSrc: imageSrcProp,
    setCroppedImageSrc,
}: {
    imageSrc: string;
    setCroppedImageSrc: (src: string) => void;
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const [imageSrc, setImageSrc] = useState(imageSrcProp);
    const [uploadAvatar] = useUploadAvatarMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);

        if (croppedImageFile) {
            // croppedImageFile - это готовый File объект для отправки на сервер
            const formData = new FormData();
            formData.append('file', croppedImageFile);

            // Отправляем на сервер
            const res = await uploadAvatar(formData);
            if (res.data) {
                setCroppedImageSrc(res.data.photoLink);
            }
        }

        onClose();
    };

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
            onOpen();
        }
    };

    return (
        <>
            <Input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
            />
            <IconButton
                aria-label='Change avatar'
                icon={<BsImageFill />}
                onClick={handleIconClick}
            />
            ;
            <ModalNotification isOpen={isOpen} onClose={onClose}>
                <Text>Изменить изображение профиля</Text>
                <Box position='relative' width='250px' height='250px'>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </Box>
                <Button onClick={handleSave}>Изменить</Button>
            </ModalNotification>
        </>
    );
};
