import { Box, Container } from '@chakra-ui/react';

import { RecipeCard } from '~/entities/RecipeCard';
import RecipeImg from '~/shared/assets/recipe_img/Spaghetti Roll.jpg';

export const MainPage = () => (
    <Container height='calc(100vh - var(--header-height))' overflow='auto'>
        <Box height='1800px' width='100%' background='lime.600'>
            MainPage
            <RecipeCard img={RecipeImg} />
        </Box>
    </Container>
);
