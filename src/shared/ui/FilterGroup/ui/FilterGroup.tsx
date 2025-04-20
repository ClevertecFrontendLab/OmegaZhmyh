import { Checkbox, Text, VStack } from '@chakra-ui/react';

interface FilterGroupProps {
    filters: string[];
    activeFilters: string[];
    onChangeFilter: (filter: string) => void;
}

export const FilterGroup = ({ activeFilters, filters, onChangeFilter }: FilterGroupProps) => (
    <VStack alignItems='start'>
        <Text fontSize='md' fontWeight='medium'>
            Тип мяса:
        </Text>
        {filters.map((filter) => (
            <Checkbox
                isChecked={activeFilters.includes(filter)}
                onChange={() => onChangeFilter(filter)}
            >
                {filter}
            </Checkbox>
        ))}
    </VStack>
);
