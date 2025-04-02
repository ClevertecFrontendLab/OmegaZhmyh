import { Flex, Text } from '@chakra-ui/react';

interface MiniBtnProps {
    value?: number;
    icon: string;
}

export const MiniBtn = ({ value = 0, icon }: MiniBtnProps) => (
    <Flex gap={1.5}>
        <img src={icon} />
        <Text color='lime.600' fontWeight='semibold'>
            {value}
        </Text>
    </Flex>
);
