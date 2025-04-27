import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsSearchActive } from '../model/selectors/search/selectIsSearchActive';
import { selectIsSearchAvailable } from '../model/selectors/search/selectIsSearchAvailable';
import { selectSearchQuery } from '../model/selectors/search/selectSearchQuery';
import { selectCountSearchedRecipes } from '../model/selectors/search/setCountSearchedRecipes';
import { resetSearch, setSearchActive, setSearchQuery } from '../model/slice';

interface SearchInputProps {}

export const SearchInput = (_props: SearchInputProps) => {
    const dispatch = useDispatch();
    const [isInputInvalid, setIsInputInvalid] = useState(false);

    const isSearchAvailable = useSelector(selectIsSearchAvailable);
    const isSearchActive = useSelector(selectIsSearchActive);
    const countSearchedRecipes = useSelector(selectCountSearchedRecipes);
    const selectQuery = useSelector(selectSearchQuery);

    useEffect(() => {
        if (isSearchActive && countSearchedRecipes === 0) {
            setIsInputInvalid(true);
        } else {
            setIsInputInvalid(false);
        }
    }, [countSearchedRecipes, dispatch, isSearchActive]);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
        if (e.target.value.length === 0) {
            dispatch(resetSearch());
        }
        if (e.target.value.length < 3) {
            setIsInputInvalid(true);
        } else {
            setIsInputInvalid(false);
        }
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
        <InputGroup
            borderColor='blackAlpha.600'
            size={{ base: 'sm', lg: 'lg' }}
            _invalid={{ borderColor: 'red.500' }}
        >
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
