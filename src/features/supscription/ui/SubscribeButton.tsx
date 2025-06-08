import { Button, Icon } from '@chakra-ui/react';

import { AppSpiner } from '~/shared/ui/app-spiner';
import { BsPersonCheck, BsPersonPlusFill } from '~/shared/ui/icon';

import { SupscriptionRequest, useGetSupscriptionMutation } from '../api/supscription';

type SubscribeButtonProps = SupscriptionRequest & {
    isFavorite?: boolean;
};
export const SubscribeButton = ({
    fromUserId,
    toUserId,
    isFavorite = false,
}: SubscribeButtonProps) => {
    const [getSupscription, { isLoading }] = useGetSupscriptionMutation();

    const handleSubscribe = () => {
        if (fromUserId && toUserId) {
            getSupscription({ fromUserId, toUserId });
        }
    };

    return (
        <>
            {isLoading && (
                <AppSpiner
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                    dataTestId='mobile-loader'
                />
            )}
            <Button
                leftIcon={isFavorite ? <Icon as={BsPersonCheck} /> : <Icon as={BsPersonPlusFill} />}
                size='xs'
                variant={isFavorite ? 'outline' : 'solid'}
                bgColor={isFavorite ? 'white' : 'black'}
                color={isFavorite ? 'black' : 'white'}
                onClick={handleSubscribe}
                data-test-id={isFavorite ? 'blog-toggle-unsubscribe' : 'blog-toggle-subscribe'}
            >
                {isFavorite ? 'Вы подписаны' : 'Подписаться'}
            </Button>
        </>
    );
};
