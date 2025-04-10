import { SearchIcon } from '@chakra-ui/icons';
import {
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
    Text,
} from '@chakra-ui/react';

import FilterIcon from '~/shared/assets/filter-icon.svg';

interface SearchPanelProps {
    title: string;
    desc?: string;
}

export const SearchPanel = ({ title, desc }: SearchPanelProps) => (
    <Flex marginTop={{ base: '16px' }} flexDirection='column' alignItems='center'>
        <Heading textAlign='center' fontSize={{ base: '2xl', lg: '5xl' }}>
            {title}
        </Heading>
        {desc ? (
            <Text color='blackAlpha.600' marginTop='12px' textAlign='center'>
                {desc}
            </Text>
        ) : null}
        <Flex
            marginTop={{ base: '16px', lg: '32px' }}
            padding={0}
            flexDirection='column'
            width={{ base: '100%', md: '450px', lg: '520px' }}
        >
            <Flex gap={3}>
                <IconButton
                    aria-label='Search database'
                    width={{ base: '32px', lg: '48px' }}
                    height={{ base: '32px', lg: '48px' }}
                    variant='outline'
                    icon={<img src={FilterIcon} />}
                    borderColor='blackAlpha.600'
                />
                <InputGroup borderColor='blackAlpha.600' size={{ base: 'sm', lg: 'lg' }}>
                    <Input
                        color='lime.800'
                        fontSize='18px'
                        borderRadius={4}
                        placeholder='Название или ингредиент...'
                        _placeholder={{ color: 'lime.800', fontSize: { md: '14px', lg: '18px' } }}
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label='Search database'
                            variant='ghost'
                            icon={<SearchIcon />}
                        />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Flex gap={4} marginTop={4} marginBottom={4} display={{ base: 'none', lg: 'flex' }}>
                <Flex gap={3} flexGrow={1} paddingLeft='8px' alignItems='center'>
                    <Text style={{ textWrap: 'nowrap' }} fontWeight='medium'>
                        Исключить мои аллергены
                    </Text>
                    <Switch colorScheme='lime' />
                </Flex>
                <Select placeholder='Выберите из списка'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </Flex>
        </Flex>
    </Flex>
);
