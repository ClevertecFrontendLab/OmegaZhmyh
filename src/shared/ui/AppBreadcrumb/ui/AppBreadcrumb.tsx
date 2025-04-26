import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { selectCategoryLabels } from '~/entities/Category/';
import { selectAllRecipes } from '~/entities/Recipe';
import { closeBurger } from '~/widgets/Layout';

interface AppBreadcrumbProps extends BreadcrumbProps {
    isMobile?: boolean;
}

export const AppBreadcrumb = ({ isMobile = false, ...props }: AppBreadcrumbProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const pathNameMap = useSelector(selectCategoryLabels);
    const allRecipes = useSelector(selectAllRecipes);
    const isMobileResolution = useBreakpointValue({ base: true, lg: false });
    const dispatch = useDispatch();

    const onBreadcrumbClick = () => {
        dispatch(closeBurger());
    };

    return (
        <Breadcrumb
            separator={<ChevronRightIcon />}
            data-test-id={
                isMobile && isMobileResolution
                    ? 'breadcrumbs'
                    : !isMobile && !isMobileResolution
                      ? 'breadcrumbs'
                      : ''
            }
            {...props}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    as={Link}
                    to='/'
                    color={pathnames.length > 0 ? 'blackAlpha.700' : 'black'}
                    onClick={onBreadcrumbClick}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const displayName =
                    index == 2
                        ? allRecipes.find((recipe) => recipe.id == +name)?.title
                        : pathNameMap[name];

                return (
                    <BreadcrumbItem key={name}>
                        {isLast ? (
                            <BreadcrumbLink color='black' onClick={onBreadcrumbClick}>
                                {displayName}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbLink
                                color='blackAlpha.700'
                                as={Link}
                                to={routeTo}
                                onClick={onBreadcrumbClick}
                            >
                                {displayName}
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
};
