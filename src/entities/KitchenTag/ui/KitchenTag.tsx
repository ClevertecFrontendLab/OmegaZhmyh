import { TagProps } from '@chakra-ui/react';

import { KitchenTagType } from '~/shared/types/KitchenTagType';
import { CardTag } from '~/shared/ui/CardTag';
import { kitchenIcons } from '~/shared/ui/KitchenIcons';

interface KitchenTagProps extends TagProps {
    type: KitchenTagType;
    color?: string;
}

export const KitchenTag = (props: KitchenTagProps) => {
    const { type, color = 'lime.50', ...otherProps } = props;
    return (
        <CardTag
            minW='129px'
            maxW='146px'
            padding={{ base: '0 4px', lg: '0 8px' }}
            bgColor={color}
            icon={kitchenIcons[type]}
            label={type}
            {...otherProps}
        />
    );
};
