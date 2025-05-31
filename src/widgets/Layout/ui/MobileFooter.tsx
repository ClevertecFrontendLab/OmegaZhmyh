import { TabList, Tabs } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import AvatarImg from '~/shared/assets/avatar.png';
import { MOBILE_FOOTER_VARIANT } from '~/shared/config/chakra-variants.constants';
import { BsHouse, BsPencil, BsSearch } from '~/shared/ui/Icons';

import { createIconTab } from '../lib/createIconTab';

export const MobileFooter = () => {
    const MainTab = createIconTab(BsHouse);
    const SearchTab = createIconTab(BsSearch);
    const EditTab = createIconTab(BsPencil);
    const AvatarTab = createIconTab(AvatarImg);

    const navigate = useNavigate();

    const handleWriteRecipe = () => {
        navigate('/new-recipe');
    };

    return (
        <Tabs
            variant={MOBILE_FOOTER_VARIANT}
            data-test-id='footer'
            colorScheme='lime'
            as='footer'
            zIndex='overlay'
        >
            <TabList>
                <MainTab>Главная</MainTab>
                <SearchTab>Поиск</SearchTab>
                <EditTab onClick={handleWriteRecipe}>Записать</EditTab>
                <AvatarTab>Мой профиль</AvatarTab>
            </TabList>
        </Tabs>
    );
};
