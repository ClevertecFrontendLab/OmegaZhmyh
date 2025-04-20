import { IconButton } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { BsFilter } from '~/shared/ui/Icons';

import { toggleIsOpenDrawer } from '../../Drawer/model/slice';

export const DrawerToggle = () => {
    const dispatch = useDispatch();
    return (
        <IconButton
            aria-label='Search database'
            onClick={() => dispatch(toggleIsOpenDrawer())}
            minWidth={{ base: '32px', lg: '48px' }}
            height={{ base: '32px', lg: '48px' }}
            variant='outline'
            icon={<BsFilter boxSize={{ base: '14px', lg: '24px' }} />}
            borderColor='blackAlpha.600'
        />
    );
};
