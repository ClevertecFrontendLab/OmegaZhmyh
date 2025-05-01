import { Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { SubCategory } from '~/entities/Category/types';

import navlinkStyles from './navlink.module.css';

interface SubcategoryListProps {
    subcategores: SubCategory[];
    categoryName: string;
}

export const SubcategoryList = (props: SubcategoryListProps) => {
    const { subcategores, categoryName } = props;
    return (
        <Flex flexDirection='column'>
            {subcategores.map(({ category, title }) => (
                <NavLink
                    key={category}
                    to={`/${categoryName}/${category}`}
                    className={({ isActive }) =>
                        `${navlinkStyles.subcategoryLink} ${
                            isActive ? navlinkStyles.activeLink : ''
                        }`
                    }
                >
                    {({ isActive }) => (
                        <span data-test-id={isActive ? `${name}-active` : ''}>{title}</span>
                    )}
                </NavLink>
            ))}
        </Flex>
    );
};
