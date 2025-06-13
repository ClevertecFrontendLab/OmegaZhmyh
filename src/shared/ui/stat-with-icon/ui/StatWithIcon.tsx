import { Flex, FlexProps, Text } from '@chakra-ui/react';

type StatWithIconProps = {
    icon: React.ReactNode;
    value: number;
} & FlexProps;

export const StatWithIcon = ({ icon, value, ...props }: StatWithIconProps) => (
    <Flex px='4px' fontSize='xs' fontWeight='semibold' gap='6px' alignItems='center' {...props}>
        {icon}
        <Text color='lime.500'>{value}</Text>
    </Flex>
);
