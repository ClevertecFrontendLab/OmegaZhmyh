import { Checkbox, Text, VStack } from '@chakra-ui/react';

interface FilterGroupProps {
    filters: { label: string; name: string }[];
    activeFilters: string[];
    onChangeFilter: (filter: string) => void;
}

export const FilterGroup = ({ activeFilters, filters, onChangeFilter }: FilterGroupProps) => (
    <VStack alignItems='start'>
        <Text fontSize='md' fontWeight='medium'>
            Тип мяса:
        </Text>
        {filters.map(({ name, label }) => (
            <Checkbox
                isChecked={activeFilters.includes(name)}
                onChange={() => onChangeFilter(name)}
                data-test-id={`checkbox-${label.toLocaleLowerCase()}`}
            >
                {label}
            </Checkbox>
        ))}
    </VStack>
);
