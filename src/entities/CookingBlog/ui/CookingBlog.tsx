import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';

import { UserCard } from '~/shared/ui/UserCard';
import { UserCardProps } from '~/shared/ui/UserCard/ui/UserCard';

interface CookingBlogProps extends UserCardProps {
    text: string;
}

export const CookingBlog = ({ text, ...userCardProps }: CookingBlogProps) => (
    <Card size='md'>
        <CardHeader padding={{ xl: '24px 24px 16px 24px', md: '16px 16px 8px 16px' }}>
            <UserCard {...userCardProps}></UserCard>
        </CardHeader>
        <CardBody padding={{ xl: '12px 24px 20px 24px', md: '8px 16px 16px 16px' }}>
            <Text noOfLines={3}>{text}</Text>
        </CardBody>
    </Card>
);
