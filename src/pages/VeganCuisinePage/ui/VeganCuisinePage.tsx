import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router';

import { setCurrentCategory } from '~/entities/Category';
import { NavbarConfig } from '~/shared/config/tabTitles';
import { RecipeCardList } from '~/widgets/RecipeCardList';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

const CURRENT_CATEGORY = 'vegan';

export const VeganCuisinePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentCategory(CURRENT_CATEGORY));
        return () => {
            dispatch(setCurrentCategory(''));
        };
    }, [dispatch]);

    return (
        <Flex
            justifyContent='center'
            direction='column'
            style={{ scrollbarGutter: 'stable' }}
            paddingX={{ base: '16px', md: '24px', lg: '9px' }}
        >
            <SearchPanel
                title='Веганская кухня'
                desc='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
            <Tabs variant='veganNavTabs' colorScheme='lime' defaultIndex={2} marginTop='32px'>
                <TabList>
                    {NavbarConfig['Веганская кухня'].tabsLinks.map((item) => (
                        <Tab key={item.tab} as={NavLink} to={item.link}>
                            {item.tab}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel>
                        <RecipeCardList
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
                        >
                            Загрузить еще
                        </Button>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <RelevantKitchen
                title='Десерты, выпечка'
                description='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны.'
                card1={{
                    title: 'Бананово-молочное желе',
                    description:
                        'Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.',
                    tagType: 'Детские блюда',
                    likeCount: 1,
                    repostCount: 1,
                }}
                card2={{
                    title: 'Нежный сливочно-сырный крем для кексов',
                    description:
                        'Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.',
                    tagType: 'Детские блюда',
                    likeCount: 2,
                    repostCount: 1,
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
};
