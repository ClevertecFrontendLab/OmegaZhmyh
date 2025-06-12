import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

import { SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';
import { AppSpiner } from '~/shared/ui/app-spiner';
import { BsPersonCheck, BsPersonPlusFill } from '~/shared/ui/icon';

import { SupscriptionRequest, useGetSupscriptionMutation } from '../api/supscriptionApi';

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
    const { handleError } = useErrorAlert();

    const handleSubscribe = async () => {
        if (fromUserId && toUserId) {
            try {
                await getSupscription({ fromUserId, toUserId }).unwrap();
                setIsSubscribed(!isSubscribed);
            } catch {
                handleError({
                    errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                    errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE,
                });
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
