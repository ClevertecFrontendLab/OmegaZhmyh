import 'swiper/swiper-bundle.css';

import { Box, LinkBox, Text, useBreakpointValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TextTagCard } from '~/entities/Recipe/ui/TextTagCard';

import { selectNewFiltredRecipes } from '../model/selectors/selectNewFiltredRecipes';
import { SlideNextButton } from './SlideNextButton';
import { SlidePrevButton } from './SlidePrevButton';

export const NewRecipes = () => {
    const newRecipes = useSelector(selectNewFiltredRecipes);

    const slideWidth = useBreakpointValue({ base: '153px', lg: '277px', xl: '322px' });
    const slideGap = useBreakpointValue({ base: '10px', xl: '24px' });
    const sliderOverflow = useBreakpointValue({ base: 'visible', md: 'hidden' });

    return (
        <Box marginTop={{ base: '32px', lg: '40px' }}>
            <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight='medium'>
                Новые рецепты
            </Text>
            <Box position='relative' marginTop={{ base: '12px', lg: '24px' }}>
                <Swiper
                    slidesPerView='auto'
                    loop={true}
                    spaceBetween={slideGap}
                    style={{ padding: '0', overflow: sliderOverflow }}
                    data-test-id='carousel'
                >
                    {newRecipes.map((recipe, i) => (
                        <LinkBox key={recipe.id}>
                            <SwiperSlide
                                key={recipe.id}
                                style={{ maxWidth: slideWidth }}
                                data-test-id={`carousel-card-${i}`}
                            >
                                <TextTagCard {...recipe} />
                            </SwiperSlide>
                        </LinkBox>
                    ))}
                    <SlidePrevButton />
                    <SlideNextButton />
                </Swiper>
            </Box>
        </Box>
    );
};
