import { Tag, TagLabel, TagProps } from '@chakra-ui/react';

import { API_BASE_IMG_URL } from '~/shared/config/constants';

interface CategoryTagProps extends TagProps {
    title: string;
    icon: string;
    bgColor: string;
}

export const CategoryTag = (props: CategoryTagProps) => {
    const { title, icon, bgColor, ...otherProps } = props;
    return (
        <Tag padding={{ base: '0 4px', lg: '0 8px' }} bgColor={bgColor} {...otherProps}>
            <img src={API_BASE_IMG_URL + icon} width='16px' height='16px' />
            <TagLabel
                marginLeft={{ base: '2px', lg: '8px' }}
                fontSize='sm'
                fontWeight='normal'
                wordBreak='break-all'
                style={{ wordWrap: 'break-word' }}
            >
                {title}
            </TagLabel>
        </Tag>
    );
};
