import {
    Button,
    Flex,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';

import { RecipeCard } from '~/features/RecipeCard';
import { NavbarConfig } from '~/shared/store/routes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

import { VeganCardList } from '../model/VeganCardList';

export const VeganCuisinePage = () => (
    <Flex
        justifyContent='center'
        direction='column'
        padding='32px 24px 0 24px'
        style={{ scrollbarGutter: 'stable' }}
    >
        <SearchPanel
            title='Веганская кухня'
            desc='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
        />
        <Tabs colorScheme='lime' defaultIndex={2}>
            <TabList justifyContent='center' whiteSpace='nowrap' overflow='hidden'>
                {NavbarConfig['Веганская кухня'].tabsLinks.map((item) => (
                    <Tab>{item.tab}</Tab>
                ))}
            </TabList>

            <TabPanels>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel>
                    <SimpleGrid
                        columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
                        columnGap='24px'
                        rowGap='16px'
                    >
                        {VeganCardList.map((cardInfo) => (
                            <RecipeCard
                                image={cardInfo.image}
                                repostCount={cardInfo.repostCount}
                                likeCount={cardInfo.likeCount}
                                tagType={cardInfo.tagType}
                                recomendationLabel={cardInfo.recomendationLabel}
                                title={cardInfo.title}
                                description={cardInfo.description}
                            />
                        ))}
                    </SimpleGrid>
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
            miniCardText1='Домашние сырные палочки'
            miniCardText2='Панкейки'
            miniCardText3='Воздушное банановое печенье на сковороде'
        />
    </Flex>
);
