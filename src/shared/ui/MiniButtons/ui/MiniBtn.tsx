import { Button } from '@chakra-ui/react';

interface MiniBtnProps {
    value?: number;
    icon: string;
}

export const MiniBtn = ({ value = 0, icon }: MiniBtnProps) => (
    <Button
        leftIcon={<img src={icon} />}
        colorScheme='lime'
        variant='ghost'
        size='xs'
        padding='6px 4px'
    >
        {value}
    </Button>
);
