import { EditIcon, Search2Icon } from '@chakra-ui/icons';
import {
    Circle,
    Flex,
    Tab,
    TabList,
    TabProps,
    Tabs,
    Text,
    useMultiStyleConfig,
    useTab,
} from '@chakra-ui/react';
import React from 'react';

import AvatarImg from '~/shared/assets/avatar.png';
import { BsHouse } from '~/shared/ui/Icons';

type CustomTabProps = typeof EditIcon | typeof Search2Icon | typeof BsHouse | string;

export function MobileTabs() {
    const createIconTab = (Icon: CustomTabProps) =>
        React.forwardRef((props: TabProps, ref) => {
            const tabProps = useTab({ ...props, ref });
            const isSelected = !!tabProps['aria-selected'];

            const styles = useMultiStyleConfig('Tabs', tabProps);
            if (typeof Icon == 'string')
                return (
                    <Tab __css={styles.tab} {...tabProps}>
                        <Flex flexDirection='column' alignItems='center'>
                            <img width='40px' height='40px' src={Icon} />
                            <Text fontWeight={isSelected ? 'medium' : 'normal'}>
                                {tabProps.children}
                            </Text>
                        </Flex>
                    </Tab>
                );
            else
                return (
                    <Tab __css={styles.tab} {...tabProps}>
                        <Flex flexDirection='column' alignItems='center'>
                            <Circle size='40px' bgColor={isSelected ? 'black' : 'none'}>
                                <Icon
                                    color={isSelected ? 'lime.50' : 'black'}
                                    boxSize={isSelected ? '16px' : '24px'}
                                />
                            </Circle>
                            <Text fontWeight={isSelected ? 'medium' : 'normal'}>
                                {tabProps.children}
                            </Text>
                        </Flex>
                    </Tab>
                );
        });

    const MainTab = createIconTab(BsHouse);
    const SearchTab = createIconTab(Search2Icon);
    const EditTab = createIconTab(EditIcon);
    const AvatarTab = createIconTab(AvatarImg);
    return (
        <Tabs width='100%' variant='unstyled'>
            <TabList justifyContent='space-around' alignItems='center'>
                <MainTab>Главная</MainTab>
                <SearchTab>Поиск</SearchTab>
                <EditTab>Главная</EditTab>
                <AvatarTab>Поиск</AvatarTab>
            </TabList>
        </Tabs>
    );
}
