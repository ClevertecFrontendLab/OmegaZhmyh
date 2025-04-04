import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Text,
} from '@chakra-ui/react';

import VeganKitchenIcon from '~/shared/assets/kitchen_icons/Vegan cuisine.svg';
import { NavbarTabs } from '~/shared/ui/NavbarTabs';

export const FoodCategory = () =>
    [
        'Салаты',
        'Закуски',
        'Первые блюда',
        'Вторые блюда',
        'Десерты, выпечка',
        'Блюда на гриле',
        'Веганская кухня',
        'Детские блюда',
        'Лечебное питание',
        'Национальные',
        'Соусы',
        'Напитки',
    ].map((item) => (
        <AccordionItem key={item}>
            <AccordionButton
                padding='12px 8px'
                gap='12px'
                fontSize='md'
                _expanded={{ backgroundColor: 'lime.100' }}
            >
                <img src={VeganKitchenIcon} alt={item} />
                <Text flex='1' textAlign='left'>
                    {item}
                </Text>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding={0}>
                <NavbarTabs
                    tabs={[
                        'Закуски',
                        'Первые блюда',
                        'Вторые блюда',
                        'Гарниры',
                        'Десерты',
                        'Выпечка',
                        'Сыроедческие блюда',
                        'Напитки',
                    ]}
                />
            </AccordionPanel>
        </AccordionItem>
    ));
