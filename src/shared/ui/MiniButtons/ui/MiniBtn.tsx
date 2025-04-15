import { Button, ButtonProps } from '@chakra-ui/react';

export interface MiniBtnProps extends ButtonProps {
    value?: number;
    icon: ButtonProps['leftIcon'];
}

export const MiniBtn = ({ value = 0, icon, size = 'xs', ...othersProps }: MiniBtnProps) => (
    <Button
        leftIcon={icon}
        colorScheme='lime'
        variant='ghost'
        size={size}
        padding='6px 4px'
        {...othersProps}
    >
        {value}
    </Button>
);
