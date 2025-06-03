import { Tag, TagLabel, TagProps } from '@chakra-ui/react';

type CardTagProps = TagProps & {
    icon: string;
    label: string;
};

export const CardTag = (props: CardTagProps) => {
    const { icon, label, ...otherProps } = props;
    return (
        <Tag {...otherProps}>
            <img src={icon} width='16px' height='16px' />
            <TagLabel marginLeft={{ base: '2px', lg: '8px' }} fontSize='sm' fontWeight='normal'>
                {label}
            </TagLabel>
        </Tag>
    );
};
