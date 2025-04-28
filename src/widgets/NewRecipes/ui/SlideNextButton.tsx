import { IconButton } from '@chakra-ui/react';
import { useSwiper } from 'swiper/react';

import { BsArrowRight } from '~/shared/ui/Icons';

export const SlideNextButton = () => {
    const swiper = useSwiper();
    return (
        <IconButton
            aria-label='previos slide'
            icon={<BsArrowRight />}
            onClick={() => swiper.slideNext()}
            position='absolute'
            top='35%'
            right='0'
            color='white'
            bgColor='black'
            zIndex={10}
            visibility={{ base: 'hidden', lg: 'visible' }}
            data-test-id='carousel-forward'
        />
    );
};
