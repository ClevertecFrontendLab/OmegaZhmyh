import { TagProps } from '@chakra-ui/react';

import { CardTag } from '~/shared/ui/CardTag';

interface RecomendationProps extends TagProps {
    avatar: string;
    userName: string;
}

export const Recomendation = (props: RecomendationProps) => {
    const { avatar, userName, ...otherProps } = props;
    return (
        <CardTag
            bgColor='lime.150'
            icon={avatar}
            label={`${userName} рекомендует`}
            {...otherProps}
        />
    );
};
