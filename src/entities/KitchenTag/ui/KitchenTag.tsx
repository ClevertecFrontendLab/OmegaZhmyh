import { TagProps } from '@chakra-ui/react';

import { kitchenIcons, KitchenTagType } from '~/shared/types/KitchenIcons';
import { CardTag } from '~/shared/ui/CardTag';

interface KitchenTagProps extends TagProps {
    type: KitchenTagType;
}

export const KitchenTag = (props: KitchenTagProps) => {
    const { type, ...otherProps } = props;
    return (
        <CardTag
            minW='129px'
            maxW='146px'
            padding={{ base: '0 4px', lg: '0 8px' }}
            bgColor='lime.50'
            icon={kitchenIcons[type]}
            label={type}
            {...otherProps}
        />
    );
};
