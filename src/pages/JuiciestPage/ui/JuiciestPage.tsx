import { Button, Flex } from '@chakra-ui/react';

import { RecipeCardList } from '~/widgets/RecipeCardList';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const JuiciestPage = () => (
    <Flex justifyContent='center' direction='column' style={{ scrollbarGutter: 'stable' }}>
        <SearchPanel title='Самое сочное' />
        <RecipeCardList
            marginTop='32px'
            columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
            columnGap={{ base: '16px', lg: '24px' }}
            rowGap='16px'
        />
        <Button
            display='block'
            margin='0 auto'
            marginTop='16px'
            bgColor='lime.400'
            color='black'
            _hover={{ bgColor: 'lime.50' }}
        >
            Загрузить еще
        </Button>
        <RelevantKitchen
            marginTop={{ base: '32px', lg: '40px' }}
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            recipe1={{
                title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
                description:
                    'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
                category: ['Вторые блюда'],
                likes: 1,
                bookmarks: 1,
            }}
            recipe2={{
                title: 'Капустные котлеты',
                description:
                    'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
                category: ['Вторые блюда'],
                likes: 2,
                bookmarks: 1,
            }}
            miniCardText1='Стейк для вегетарианцев'
            miniCardIcon1='Вторые блюда'
            miniCardText2='Котлеты из гречки и фасоли'
            miniCardIcon2='Вторые блюда'
            miniCardText3='Сырный суп с лапшой и брокколи'
            miniCardIcon3='Первые блюда'
        />
    </Flex>
);
