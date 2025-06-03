import { IconButton } from '@chakra-ui/react';
import { useSwiper } from 'swiper/react';

import { BsArrowLeft } from '~/shared/ui/icon';

export const SlidePrevButton = () => {
    const swiper = useSwiper();
    return (
        <IconButton
            aria-label='previos slide'
            icon={<BsArrowLeft />}
            onClick={() => swiper.slidePrev()}
            position='absolute'
            top='35%'
            left='0'
            color='white'
            bgColor='black'
            zIndex={10}
            visibility={{ base: 'hidden', lg: 'visible' }}
            data-test-id='carousel-back'
        />
    );
};
