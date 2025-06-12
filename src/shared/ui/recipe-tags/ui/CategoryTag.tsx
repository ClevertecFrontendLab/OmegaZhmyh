import { Tag, TagLabel, TagProps } from '@chakra-ui/react';

import { getImgUrlPath } from '~/shared/lib';

type CategoryTagProps = TagProps & {
    title: string;
    icon: string;
    bgColor: string;
};

export const CategoryTag = (props: CategoryTagProps) => {
    const { title, icon, bgColor, ...otherProps } = props;
    return (
        <Tag padding={{ base: '0 4px', lg: '0 8px' }} bgColor={bgColor} {...otherProps}>
            <img src={getImgUrlPath(icon)} width='16px' height='16px' />
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
