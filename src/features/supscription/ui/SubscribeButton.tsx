import { Button, Icon } from '@chakra-ui/react';

import { BsPersonCheck, BsPersonPlusFill } from '~/shared/ui/icon';

import { SupscriptionRequest, useGetSupscriptionMutation } from '../api/supscription';

type SubscribeButtonProps = SupscriptionRequest & {
    isFavorite: boolean;
};
export const SubscribeButton = ({ fromUserId, toUserId, isFavorite }: SubscribeButtonProps) => {
    const [getSupscription] = useGetSupscriptionMutation();

    const handleSubscribe = () => {
        if (fromUserId && toUserId) {
            getSupscription({ fromUserId, toUserId });
        }
    };

    return (
        <Button
            leftIcon={isFavorite ? <Icon as={BsPersonCheck} /> : <Icon as={BsPersonPlusFill} />}
            size='xs'
            variant={isFavorite ? 'outline' : 'solid'}
            bgColor={isFavorite ? 'white' : 'black'}
            color={isFavorite ? 'black' : 'white'}
            onClick={handleSubscribe}
        >
            {isFavorite ? 'Вы подписаны' : 'Подписаться'}
        </Button>
    );
};
