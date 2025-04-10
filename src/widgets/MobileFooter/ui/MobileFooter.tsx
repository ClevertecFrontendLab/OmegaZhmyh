import { EditIcon, Search2Icon } from '@chakra-ui/icons';
import { TabList, Tabs } from '@chakra-ui/react';

import AvatarImg from '~/shared/assets/avatar.png';
import { BsHouse } from '~/shared/ui/Icons';

import { createIconTab } from '../lib/createIconTab';

export const MobileFooter = () => {
    const MainTab = createIconTab(BsHouse);
    const SearchTab = createIconTab(Search2Icon);
    const EditTab = createIconTab(EditIcon);
    const AvatarTab = createIconTab(AvatarImg);
    return (
        <Tabs variant='mobileFooter' data-test-id='footer' colorScheme='lime' as='footer'>
            <TabList>
                <MainTab>Главная</MainTab>
                <SearchTab>Поиск</SearchTab>
                <EditTab>Записать</EditTab>
                <AvatarTab>Мой профиль</AvatarTab>
            </TabList>
        </Tabs>
    );
};
