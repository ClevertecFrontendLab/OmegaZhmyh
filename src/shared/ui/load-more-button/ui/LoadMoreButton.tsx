import { Button, Flex, Spinner } from '@chakra-ui/react';

interface LoadMoreButtonProps {
    handleLoadMore: () => void;
    isFetching: boolean;
}

export const LoadMoreButton = ({ handleLoadMore, isFetching }: LoadMoreButtonProps) => (
    <Button
        display='block'
        margin='0 auto'
        marginTop='16px'
        bgColor='lime.400'
        color='black'
        _hover={{ bgColor: 'lime.50' }}
        onClick={handleLoadMore}
        isDisabled={isFetching}
        data-test-id='load-more-button'
    >
        <Flex alignItems='center' gap='8px'>
            {isFetching ? <Spinner boxSize='12px' /> : null}
            {isFetching ? 'Загрузка' : 'Загрузить еще'}
        </Flex>
    </Button>
);
