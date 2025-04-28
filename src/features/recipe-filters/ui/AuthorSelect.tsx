import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Menu, MenuButton, Text } from '@chakra-ui/react';

export const AuthorSelect = () => (
    <Menu closeOnSelect={false}>
        <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant='outline'
            width='100%'
            height='none'
            paddingY='10px'
            minHeight='40px'
            fontSize='md'
            color='blackAlpha.700'
            borderColor='blackAlpha.200'
        >
            <Flex>
                <Text>Поиск по автору</Text>
            </Flex>
        </MenuButton>
    </Menu>
);
