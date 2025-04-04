import { Flex, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { NavbarConfig } from '~/shared/store/config';

export const MainPage = () => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const [panelHeight, setPanelHeight] = useState('auto');

    useEffect(() => {
        if (tabsRef.current) {
            const { top } = tabsRef.current.getBoundingClientRect();
            const calculatedHeight = `calc(100vh - ${top}px)`;
            setPanelHeight(calculatedHeight);
        }
    }, []);
    return (
        <Flex>
            <Tabs>
                <TabList>
                    {NavbarConfig['Веганская кухня'].tabsLinks.map((item) => (
                        <Tab>{item.tab}</Tab>
                    ))}
                </TabList>

                <TabPanels>
                    <TabPanel ref={tabsRef} height={panelHeight} overflow='auto'>
                        <SimpleGrid
                            columns={{ base: 1, lg: 2 }}
                            columnGap='24px'
                            rowGap='16px'
                        ></SimpleGrid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};
