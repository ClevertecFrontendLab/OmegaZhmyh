import { Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { SubCategory } from '~/entities/category/';

import navlinkStyles from './navlink.module.css';

type SubcategoryListProps = {
    subcategores: SubCategory[];
    categoryName: string;
};

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
                        <span data-test-id={isActive ? `${category}-active` : ''}>{title}</span>
                    )}
                </NavLink>
            ))}
        </Flex>
    );
};
