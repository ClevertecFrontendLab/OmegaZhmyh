import { IconButton } from '@chakra-ui/react';

import { BsArrowLeft } from '~/shared/ui/Icons';

export const ArrowLeftBtn = () => (
    <IconButton
        top='41%'
        left='-8px'
        display={{ base: 'none', lg: 'flex' }}
        transform='translateY(-50%)'
        aria-label='corousel back'
        icon={<BsArrowLeft boxSize={{ base: '16px', xl: '24px' }} />}
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
