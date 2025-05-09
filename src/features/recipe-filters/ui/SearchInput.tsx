import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectIsSearchAvailable,
    selectIsSearchInputInvalid,
    selectSearchQuery,
} from '../model/slice';
import { setSearchActive, setSearchQuery } from '../model/slice';

export const SearchInput = () => {
    const dispatch = useDispatch();

    const isSearchAvailable = useSelector(selectIsSearchAvailable);
    const selectQuery = useSelector(selectSearchQuery);
    const isInputInvalid = useSelector(selectIsSearchInputInvalid);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleSearchActive = () => {
        dispatch(setSearchActive());
    };

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
                isInvalid={isInputInvalid}
                color='lime.800'
                focusBorderColor='lime.300'
                fontSize={{ base: '14px', lg: '18px' }}
                borderRadius={4}
                placeholder='Название или ингредиент...'
                _invalid={{ borderColor: 'red.500' }}
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
