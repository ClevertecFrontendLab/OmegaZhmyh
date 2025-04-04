import { Tag, TagLabel, TagProps } from '@chakra-ui/react';

interface CardTag extends TagProps {
    icon: string;
    label: string;
}

export const CardTag = (props: CardTag) => {
    const { icon, label, ...otherProps } = props;
    return (
        <Tag {...otherProps}>
            <img src={icon} />
            <TagLabel>{label}</TagLabel>
        </Tag>
    );
};
