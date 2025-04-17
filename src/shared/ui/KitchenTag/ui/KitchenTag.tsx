import { Tag, TagLabel, TagProps } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { kitchenIcons } from '~/shared/ui/KitchenIcons';

import { getCategoryLabel } from '../../../store/category/getCategoryLabel';

interface KitchenTagProps extends TagProps {
    category: string;
    color?: string;
}

export const KitchenTag = (props: KitchenTagProps) => {
    const { category, color = 'lime.50', ...otherProps } = props;
    const categoryLabels = useSelector(getCategoryLabel);
    return (
        <Tag padding={{ base: '0 4px', lg: '0 8px' }} bgColor={color} {...otherProps}>
            <img
                src={kitchenIcons[category] || kitchenIcons['snacks']}
                width='16px'
                height='16px'
            />
            <TagLabel marginLeft={{ base: '2px', lg: '8px' }} fontSize='sm' fontWeight='normal'>
                {categoryLabels[category] || category}
            </TagLabel>
        </Tag>
    );
};
