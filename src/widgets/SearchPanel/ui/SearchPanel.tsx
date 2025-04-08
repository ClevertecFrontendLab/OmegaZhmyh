import { SearchIcon } from '@chakra-ui/icons';
import {
    Container,
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
    <Container maxWidth={696}>
        <Heading textAlign='center' fontSize='5xl'>
            {title}
        </Heading>
        {desc ? (
            <Text color='blackAlpha.600' marginTop='12px' textAlign='center'>
                {desc}
            </Text>
        ) : null}
        <Container maxWidth={518} marginTop='32px' padding={0}>
            <Flex justifyContent='center' gap={3}>
                <IconButton
                    aria-label='Search database'
                    variant='outline'
                    icon={<img src={FilterIcon} />}
                    borderColor='blackAlpha.600'
                />
                <InputGroup borderColor='blackAlpha.600'>
                    <Input
                        color='lime.800'
                        fontSize='18'
                        placeholder='Название или ингредиент...'
                        _placeholder={{ color: 'lime.800' }}
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
                    <Text style={{ textWrap: 'nowrap' }}>Исключить мои аллергены</Text>
                    <Switch colorScheme='lime' />
                </Flex>
                <Select placeholder='Выберите из списка'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </Flex>
        </Container>
    </Container>
);
