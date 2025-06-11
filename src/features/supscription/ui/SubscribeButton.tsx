import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

import { AppSpiner } from '~/shared/ui/app-spiner';
import { BsPersonCheck, BsPersonPlusFill } from '~/shared/ui/icon';

import { SupscriptionRequest, useGetSupscriptionMutation } from '../api/supscription';

const TOOLTIP_TEXT = {
    subscribe: 'Нажмите, если хотите подписаться',
    unsubscribe: 'Нажмите, если хотите отписаться',
};

type SubscribeButtonProps = SupscriptionRequest & {
    isFavorite: boolean;
};

export const SubscribeButton = ({ fromUserId, toUserId, isFavorite }: SubscribeButtonProps) => {
    const [isSubscribed, setIsSubscribed] = useState(isFavorite);
    const [getSupscription, { isLoading }] = useGetSupscriptionMutation();

    const handleSubscribe = async () => {
        if (fromUserId && toUserId) {
            try {
                await getSupscription({ fromUserId, toUserId }).unwrap();
                setIsSubscribed(!isSubscribed);
            } catch (error) {
                console.error('Failed to toggle subscription:', error);
            }
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
            <Tooltip
                label={TOOLTIP_TEXT[isSubscribed ? 'unsubscribe' : 'subscribe']}
                w='150px'
                fontSize='sm'
                bgColor='blackAlpha.900'
                borderRadius='4px'
                placement='bottom'
                hasArrow
                data-test-id='blog-tooltip'
            >
                {isSubscribed ? (
                    <Button
                        leftIcon={<Icon as={BsPersonCheck} />}
                        size='xs'
                        variant='outline'
                        bgColor='whiteAlpha.100'
                        borderColor='blackAlpha.600'
                        color='black'
                        onClick={handleSubscribe}
                        data-test-id='blog-toggle-unsubscribe'
                    >
                        Вы подписаны
                    </Button>
                ) : (
                    <Button
                        leftIcon={<Icon as={BsPersonPlusFill} />}
                        size='xs'
                        variant='solid'
                        bgColor='black'
                        color='white'
                        onClick={handleSubscribe}
                        data-test-id='blog-toggle-subscribe'
                    >
                        Подписаться
                    </Button>
                )}
            </Tooltip>
        </>
    );
};
