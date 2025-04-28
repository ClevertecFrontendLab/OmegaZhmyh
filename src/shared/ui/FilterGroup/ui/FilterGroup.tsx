import { Checkbox, Text, VStack } from '@chakra-ui/react';

interface FilterGroupProps {
    filters: { label: string; name: string }[];
    activeFilters: string[];
    onChangeFilter: (filter: string) => void;
    title: string;
}

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
        {filters.map(({ name, label }) => (
            <Checkbox
                isChecked={activeFilters.includes(name)}
                onChange={() => onChangeFilter(name)}
                data-test-id={`checkbox-${label.toLocaleLowerCase()}`}
                key={name}
            >
                {label}
            </Checkbox>
        ))}
    </VStack>
);
