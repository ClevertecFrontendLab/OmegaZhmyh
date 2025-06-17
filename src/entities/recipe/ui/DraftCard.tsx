import { Button } from '@chakra-ui/react';

import { BaseCard } from './BaseCard';

type DraftCardProps = {
    image: string;
    title: string;
    description: string;
};

export const DraftCard = ({ image, title, description }: DraftCardProps) => (
    <BaseCard
        image={image}
        title={title}
        description={description}
        actions={
            <Button variant='solid' bgColor='black' color='white'>
                Редактировать
            </Button>
        }
    />
);
