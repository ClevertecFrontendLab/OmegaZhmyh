import { IconButton } from '@chakra-ui/react';

import { BsArrowRight } from '~/shared/ui/Icons';

export const ArrowRightBtn = () => (
    <IconButton
        top='41%'
        right='-8px'
        display={{ base: 'none', lg: 'flex' }}
        transform='translateY(-50%)'
        aria-label='corousel forward'
        icon={<BsArrowRight boxSize={{ base: '16px', xl: '24px' }} />}
        position='absolute'
        bgColor='black'
        color='lime.50'
        boxSize={{ base: '40px', xl: '48px' }}
        _hover={{
            color: 'black',
            backgroundColor: 'white',
            outline: '1px solid black',
        }}
    />
);
