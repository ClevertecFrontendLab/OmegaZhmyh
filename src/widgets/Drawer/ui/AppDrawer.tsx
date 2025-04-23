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
    Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import {
    AllergenSelect,
    AllergenToggle,
    MeatFilters,
    SideDishesFilters,
} from '~/features/recipe-filters';
import { BsFillXCircleFill } from '~/shared/ui/Icons';

import { selectIsDrawerOpen } from '../model/selectors';
import { toggleIsOpenDrawer } from '../model/slice';

export const AppDrawer = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(selectIsDrawerOpen);

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
                    <MeatFilters />
                    <SideDishesFilters />
                    <Box>
                        <AllergenToggle />
                        <AllergenSelect />
                    </Box>
                </DrawerBody>

                <DrawerFooter borderTopWidth='1px'>
                    <Button data-test-id='clear-filter-button'>Очистить фильтр</Button>
                    <Button data-test-id='find-recipe-button'>Найти рецепт</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
