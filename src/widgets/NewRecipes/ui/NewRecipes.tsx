import 'swiper/swiper-bundle.css';

import { Box, LinkBox, Text, useBreakpointValue } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetLatestReciperQuery } from '~/shared/api/yeedaaApi';

import { NewRecipeCard } from './NewRecipeCard';
import { SlideNextButton } from './SlideNextButton';
import { SlidePrevButton } from './SlidePrevButton';

export const NewRecipes = () => {
    //const newRecipes = useSelector(selectNewFiltredRecipes);

    const slideWidth = useBreakpointValue({ base: '153px', lg: '277px', xl: '322px' });
    const slideGap = useBreakpointValue({ base: '10px', xl: '24px' });
    const sliderOverflow = useBreakpointValue({ base: 'visible', md: 'hidden' });
    const { data: newRecipes } = useGetLatestReciperQuery();

    return newRecipes?.data ? (
        <Box>
            <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight='medium'>
                Новые рецепты
            </Text>
            <Box position='relative' marginTop={{ base: '12px', lg: '24px' }}>
                <Swiper
                    slidesPerView='auto'
                    loop={!!newRecipes?.data && newRecipes.data.length > 2}
                    spaceBetween={slideGap}
                    style={{ padding: '0', overflow: sliderOverflow }}
                    data-test-id='carousel'
                >
                    {[...newRecipes.data]
                        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                        ?.map((recipe, i) => (
                            <LinkBox key={recipe._id}>
                                <SwiperSlide
                                    key={recipe._id}
                                    style={{ maxWidth: slideWidth }}
                                    data-test-id={`carousel-card-${i}`}
                                >
                                    <NewRecipeCard recipe={recipe} />
                                </SwiperSlide>
                            </LinkBox>
                        ))}
                    <SlidePrevButton />
                    <SlideNextButton />
                </Swiper>
            </Box>
        </Box>
    ) : null;
};
