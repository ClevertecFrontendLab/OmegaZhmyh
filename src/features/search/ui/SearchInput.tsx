import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

interface SearchInputProps {}

export const SearchInput = (_props: SearchInputProps) => (
    <InputGroup borderColor='blackAlpha.600' size={{ base: 'sm', lg: 'lg' }}>
        <Input
            color='lime.800'
            focusBorderColor='lime.300'
            fontSize={{ base: '14px', lg: '18px' }}
            borderRadius={4}
            placeholder='Название или ингредиент...'
            _placeholder={{ color: 'lime.800', fontSize: { md: '14px', lg: '18px' } }}
        />
        <InputRightElement>
            <IconButton aria-label='Search database' variant='ghost' icon={<SearchIcon />} />
        </InputRightElement>
    </InputGroup>
);
