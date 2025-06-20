import { Avatar } from '@chakra-ui/react';
import { useState } from 'react';

import { useGetBloggerByIdQuery } from '~/entities/cooking-blog';
import { selectUserId } from '~/features/auth';
import { getImgUrlPath } from '~/shared/lib';
import { useAppSelector } from '~/shared/store';

import { ChangeAvatarButton } from './ChangeAvatarButton';

export const AvatarSetting = () => {
    const currentUserId = useAppSelector(selectUserId);
    const [croppedImageSrc, setCroppedImageSrc] = useState<string | null>(null);
    const { data: user } = useGetBloggerByIdQuery({
        bloggerId: currentUserId || '',
        currentUserId: currentUserId || '',
    });

    return (
        <>
            <Avatar
                src={getImgUrlPath(croppedImageSrc || user?.bloggerInfo.photoLink || '')}
                size={{ base: 'xl', lg: '2xl' }}
                mt='16px'
            />
            <ChangeAvatarButton
                imageSrc={user?.bloggerInfo.photoLink || ''}
                setCroppedImageSrc={setCroppedImageSrc}
            />
        </>
    );
};
