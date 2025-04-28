import { EditIcon, Search2Icon } from '@chakra-ui/icons';
import { Circle, Tab, TabProps, Text, useMultiStyleConfig, useTab } from '@chakra-ui/react';
import React from 'react';

import { BsHouse } from '~/shared/ui/Icons';

type CustomTabProps = typeof EditIcon | typeof Search2Icon | typeof BsHouse | string;

export const createIconTab = (Icon: CustomTabProps) =>
    React.forwardRef((props: TabProps, ref) => {
        const tabProps = useTab({ ...props, ref });
        const isSelected = !!tabProps['aria-selected'];

        const styles = useMultiStyleConfig('Tabs', tabProps);
        return (
            <Tab __css={styles.tab} {...tabProps}>
                {typeof Icon == 'string' ? (
                    <img width='40px' height='40px' src={Icon} />
                ) : (
                    <Circle size='40px' bgColor={isSelected ? 'black' : 'none'}>
                        <Icon
                            color={isSelected ? 'lime.50' : 'black'}
                            boxSize={isSelected ? '16px' : '24px'}
                        />
                    </Circle>
                )}
                <Text fontWeight={isSelected ? 'medium' : 'normal'} fontSize='xs'>
                    {tabProps.children}
                </Text>
            </Tab>
        );
    });
