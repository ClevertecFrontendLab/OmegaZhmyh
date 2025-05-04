import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Tag,
    Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import {
    AuthorSelect,
    CategorySelect,
    DrawerAllergenSelect,
    DrawerAllergenToggle,
    MeatFilters,
    selectAllFilters,
    selectIsFiltersAvailable,
    SideDishesFilters,
} from '~/features/recipe-filters';
import { resetDrawerFilters, setDrawerFiltersActive } from '~/features/recipe-filters/model/slice';
import { BsFillXCircleFill } from '~/shared/ui/Icons';

import { selectIsDrawerOpen } from '../model/selectIsDrawerOpen';
import { toggleIsOpenDrawer } from '../model/slice';

export const AppDrawer = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(selectIsDrawerOpen);
    const isFindRecipeAvailable = useSelector(selectIsFiltersAvailable);
    const allFilters = useSelector(selectAllFilters);

    const onCloseHandler = () => dispatch(toggleIsOpenDrawer());
    const onClearHandler = () => {
        dispatch(resetDrawerFilters());
    };
    const onFindHandler = () => {
        dispatch(setDrawerFiltersActive());
        onCloseHandler();
    };

    return (
        <Drawer
            isOpen={isDrawerOpen}
            onClose={onCloseHandler}
            size={{ base: 'xs', lg: 'sm' }}
            variant='drawer'
        >
            <DrawerOverlay />
            <DrawerContent padding='32px 8px 16px 16px' transitionDuration='100ms'>
                <DrawerCloseButton data-test-id='close-filter-drawer'>
                    <BsFillXCircleFill boxSize='24px' />
                </DrawerCloseButton>

                <DrawerBody
                    as={Flex}
                    flexDirection='column'
                    justifyContent='start'
                    padding={0}
                    paddingRight='8px'
                    gap={{ base: '16px', lg: '24px' }}
                    data-test-id='filter-drawer'
                >
                    <Text marginBottom='16px' fontSize='2xl' fontWeight='bold'>
                        Фильтр
                    </Text>
                    <CategorySelect />
                    <AuthorSelect />
                    <MeatFilters />
                    <SideDishesFilters />
                    <Box>
                        <DrawerAllergenToggle />
                        <DrawerAllergenSelect />
                    </Box>
                    <Flex
                        flexWrap='wrap'
                        gap='8px'
                        minHeight='112px'
                        alignItems='start'
                        alignContent='start'
                    >
                        {allFilters.map((filter) => (
                            <Tag
                                key={filter}
                                variant='outline'
                                colorScheme='lime'
                                color='lime.600'
                                data-test-id='filter-tag'
                            >
                                {filter}
                            </Tag>
                        ))}
                    </Flex>
                    <Flex gap='8px'>
                        <Button
                            data-test-id='clear-filter-button'
                            onClick={onClearHandler}
                            variant='outline'
                            color='blackAlpha.800'
                            backgroundColor='whiteAlpha.100'
                            borderColor='blackAlpha.600'
                            size={{ base: 'sm', lg: 'lg' }}
                        >
                            Очистить фильтр
                        </Button>
                        <Button
                            data-test-id='find-recipe-button'
                            onClick={onFindHandler}
                            isDisabled={!isFindRecipeAvailable}
                            pointerEvents={isFindRecipeAvailable ? 'auto' : 'none'}
                            variant='solid'
                            color='white'
                            backgroundColor='blackAlpha.900'
                            borderColor='blackAlpha.200'
                            border='1px solid black'
                            size={{ base: 'sm', lg: 'lg' }}
                            _hover={{ color: 'black', bgColor: 'white' }}
                        >
                            Найти рецепт
                        </Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
