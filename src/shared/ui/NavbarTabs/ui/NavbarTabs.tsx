import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { Link } from 'react-router';

interface NavbarTabsProps {
    tabs: { tab: string; link: string }[];
}

export const NavbarTabs = ({ tabs }: NavbarTabsProps) => (
    <Tabs orientation='vertical' variant='unstyled' gap={4}>
        <TabList>
            {tabs.map(({ tab, link }, index) => (
                <Link to={link}>
                    <Tab
                        key={index}
                        justifyContent='start'
                        padding={0}
                        height={9}
                        marginLeft={10}
                        position='relative'
                        _before={{
                            content: '""',
                            position: 'absolute',
                            height: 6,
                            width: 1,
                            left: -3,
                            background: 'lime.50',
                        }}
                        _selected={{
                            fontWeight: 'bold',
                            '&::before': {
                                width: 2,
                                left: -4,
                                background: 'lime.300',
                                transition: 'width 0.2s, left 0.2s',
                            },
                        }}
                    >
                        {tab}
                    </Tab>
                </Link>
            ))}
        </TabList>
    </Tabs>
);
