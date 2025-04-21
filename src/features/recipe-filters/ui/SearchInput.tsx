import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsSearchAvailable } from '../model/selectors/search/selectIsSearchAvailable';
import { selectSearchQuery } from '../model/selectors/search/selectSearchQuery';
import { resetSearch, setSearchActive, setSearchQuery } from '../model/slice';

interface SearchInputProps {}

export const SearchInput = (_props: SearchInputProps) => {
    const dispatch = useDispatch();

    const isSearchAvailable = useSelector(selectIsSearchAvailable);
    const selectQuery = useSelector(selectSearchQuery);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
        if (e.target.value.length === 0) {
            dispatch(resetSearch());
        }
    };

    const handleSearchActive = () => dispatch(setSearchActive());

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchActive();
        }
    };

    return (
        <InputGroup borderColor='blackAlpha.600' size={{ base: 'sm', lg: 'lg' }}>
            <Input
                onChange={handleSearchInput}
                onKeyDown={handleKeyDown}
                value={selectQuery}
                color='lime.800'
                focusBorderColor='lime.300'
                fontSize={{ base: '14px', lg: '18px' }}
                borderRadius={4}
                placeholder='Название или ингредиент...'
                _placeholder={{ color: 'lime.800', fontSize: { md: '14px', lg: '18px' } }}
                data-test-id='search-input'
            />
            <InputRightElement>
                <IconButton
                    onClick={handleSearchActive}
                    isDisabled={!isSearchAvailable}
                    pointerEvents={!isSearchAvailable ? 'none' : 'auto'}
                    aria-label='Search database'
                    variant='ghost'
                    _disabled={{
                        color: 'blackAlpha.200',
                    }}
                    icon={<SearchIcon />}
                    data-test-id='search-button'
                />
            </InputRightElement>
        </InputGroup>
    );
};
