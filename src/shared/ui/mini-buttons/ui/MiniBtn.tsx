import { Button, ButtonProps } from '@chakra-ui/react';

export type MiniBtnProps = ButtonProps & {
    icon: ButtonProps['leftIcon'];
    value?: number;
};

export const MiniBtn = ({ value = 0, icon, size = 'xs', ...othersProps }: MiniBtnProps) => (
    <Button
        leftIcon={icon}
        colorScheme='lime'
        variant='ghost'
        size={size}
        padding='4px 8px'
        {...othersProps}
    >
        {value}
    </Button>
);
