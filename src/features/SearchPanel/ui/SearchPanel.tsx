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
        <Heading marginTop='32px' textAlign='center'>
            {title}
        </Heading>
        {desc ? (
            <Text color='blackAlpha.600' textAlign='center'>
                {desc}
            </Text>
        ) : null}
        <Container maxWidth={518} marginTop='32px'>
            <Flex justifyContent='center' gap={3}>
                <IconButton aria-label='Search database' icon={<img src={FilterIcon} />} />
                <InputGroup>
                    <Input placeholder='Название или ингредиент...' />
                    <InputRightElement>
                        <IconButton aria-label='Search database' icon={<SearchIcon />} />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Flex gap={4} marginTop={4} marginBottom={4}>
                <Flex gap={3} flexGrow={1} paddingLeft='8px' alignItems='center'>
                    <Text style={{ textWrap: 'nowrap' }}>Исключить мои аллергены</Text>
                    <Switch />
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
