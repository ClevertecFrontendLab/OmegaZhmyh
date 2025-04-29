import { Flex, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { SubCategory } from '~/shared/types/category';

interface SubcategoryListProps {
    subcategores: SubCategory[];
    categoryName: string;
}

export const SubcategoryList = (props: SubcategoryListProps) => {
    const { subcategores, categoryName } = props;
    return (
        <Flex flexDirection='column'>
            {subcategores.map(({ category, title }) => (
                <>
                    <Link
                        key={category}
                        as={NavLink}
                        to={`/${categoryName}/${category}`}
                        _hover={{ bg: 'lime.50' }}
                        variant='subcategoryLink'
                    >
                        <NavLink to={`/${categoryName}/${name}`}>
                            {({ isActive }) => (
                                <span data-test-id={isActive ? `${name}-active` : ''}>{title}</span>
                            )}
                        </NavLink>
                    </Link>
                </>
            ))}
        </Flex>
    );
};
