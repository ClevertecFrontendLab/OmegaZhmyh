import { Checkbox, Text, VStack } from '@chakra-ui/react';

type FilterGroupProps = {
    filters: string[];
    activeFilters: string[];
    onChangeFilter: (filter: string) => void;
    title: string;
};

export const FilterGroup = ({
    activeFilters,
    filters,
    onChangeFilter,
    title,
}: FilterGroupProps) => (
    <VStack alignItems='start'>
        <Text fontSize='md' fontWeight='medium'>
            {title}
        </Text>
        {filters.map((filter) => (
            <Checkbox
                isChecked={activeFilters.includes(filter)}
                onChange={() => onChangeFilter(filter)}
                data-test-id={`checkbox-${filter.toLocaleLowerCase()}`}
                key={filter}
            >
                {filter}
            </Checkbox>
        ))}
    </VStack>
);
