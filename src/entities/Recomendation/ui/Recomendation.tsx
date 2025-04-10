import { TagProps } from '@chakra-ui/react';

import { AvatarImages, AvatarImagesType } from '~/shared/ui/AvatarImages';
import { CardTag } from '~/shared/ui/CardTag';

interface RecomendationProps extends TagProps {
    avatar: AvatarImagesType;
    userName: string;
}

export const Recomendation = (props: RecomendationProps) => {
    const { avatar, userName, ...otherProps } = props;
    return (
        <CardTag
            bgColor='lime.150'
            padding={{ base: '0 4px', lg: '4px 8px' }}
            height={{ lg: '28px' }}
            icon={AvatarImages[avatar]}
            label={`${userName} рекомендует`}
            {...otherProps}
        />
    );
};
