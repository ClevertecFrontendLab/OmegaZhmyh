import { Avatar, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { BsBookmarkHeart, BsGearFill, BsPeople } from '~/shared/ui/icon';
import { StatWithIcon } from '~/shared/ui/stat-with-icon';

export const UserProfileHeader = () => (
    <HStack>
        <Avatar />
        <VStack>
            <Text>John Doe</Text>
            <Text>john.doe@example.com</Text>
            <HStack>
                <StatWithIcon icon={<BsBookmarkHeart />} value={100} />
                <StatWithIcon icon={<BsPeople />} value={100} />
            </HStack>
        </VStack>
        <IconButton icon={<BsGearFill />} aria-label='Settings' />
    </HStack>
);
