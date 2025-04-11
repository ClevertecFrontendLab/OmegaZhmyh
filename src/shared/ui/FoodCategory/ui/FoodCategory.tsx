import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Text,
} from '@chakra-ui/react';

import { NavbarTabs } from '~/shared/ui/NavbarTabs';

import { NavbarConfig } from '../../../config/tabTitles';

export const FoodCategory = () =>
    Object.keys(NavbarConfig).map((tabName) => (
        <AccordionItem key={tabName} border='none'>
            <AccordionButton
                padding='12px 8px'
                gap='12px'
                fontSize='md'
                fontWeight='medium'
                color='black'
                _expanded={{ backgroundColor: 'lime.100' }}
            >
                <img src={NavbarConfig[tabName].icon} alt={tabName} />
                <Text flex='1' textAlign='left'>
                    {tabName}
                </Text>
                <AccordionIcon />
            </AccordionButton>

            <AccordionPanel padding={0}>
                <NavbarTabs tabs={NavbarConfig[tabName].tabsLinks} />
            </AccordionPanel>
        </AccordionItem>
    ));
