import { IconButton, Input, InputGroup } from '@chakra-ui/react';

import { BsPlusCircleFill } from '~/shared/ui/icon';

type CustomItemInputProps = {
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    customItemValue: string;
    onAddItem: () => void;
    inputDataTestId: string;
    iconButtonDataTestId: string;
};

export const CustomItemInput = ({
    onInput,
    onKeyDown,
    placeholder,
    customItemValue,
    onAddItem,
    inputDataTestId,
    iconButtonDataTestId,
}: CustomItemInputProps) => (
    <InputGroup padding='8px 8px 8px 24px' alignItems='center' gap='8px'>
        <Input
            onChange={onInput}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            value={customItemValue}
            size='sm'
            data-test-id={inputDataTestId}
        />
        <IconButton
            onClick={onAddItem}
            aria-label='123'
            color='lime.800'
            size='xs'
            variant='ghost'
            icon={<BsPlusCircleFill color='lime.600' />}
            data-test-id={iconButtonDataTestId}
        />
    </InputGroup>
);
