import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    Flex,
    Tag,
    Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import {
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

    return (
        <Drawer isOpen={isDrawerOpen} onClose={onCloseHandler} size={{ base: 'xs', lg: 'sm' }}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton data-test-id='close-filter-drawer'>
                    <BsFillXCircleFill />
                </DrawerCloseButton>

                <DrawerBody
                    as={Flex}
                    flexDirection='column'
                    justifyContent='start'
                    gap='24px'
                    data-test-id='filter-drawer'
                >
                    <Text marginBottom='16px' fontSize='2xl' fontWeight='bold'>
                        Фильтр
                    </Text>
                    <CategorySelect />
                    <MeatFilters />
                    <SideDishesFilters />
                    <Box>
                        <DrawerAllergenToggle />
                        <DrawerAllergenSelect />
                    </Box>
                    <Flex flexWrap='wrap'>
                        {allFilters.map((filter) => (
                            <Tag data-test-id='filter-tag'>{filter}</Tag>
                        ))}
                    </Flex>
                </DrawerBody>

                <DrawerFooter borderTopWidth='1px'>
                    <Button
                        data-test-id='clear-filter-button'
                        onClick={() => dispatch(resetDrawerFilters())}
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        data-test-id='find-recipe-button'
                        onClick={() => {
                            dispatch(setDrawerFiltersActive());
                            onCloseHandler();
                        }}
                        isDisabled={!isFindRecipeAvailable}
                        pointerEvents={isFindRecipeAvailable ? 'auto' : 'none'}
                    >
                        Найти рецепт
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
