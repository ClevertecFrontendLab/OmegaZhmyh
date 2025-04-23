import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { selectCategoryLabels } from '~/entities/Category/';

interface AppBreadcrumbProps extends BreadcrumbProps {}

export const AppBreadcrumb = (props: AppBreadcrumbProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const pathNameMap = useSelector(selectCategoryLabels);

    return (
        <Breadcrumb separator={<ChevronRightIcon />} data-test-id='breadcrumbs' {...props}>
            <BreadcrumbItem>
                <BreadcrumbLink
                    as={Link}
                    to='/'
                    color={pathnames.length > 0 ? 'blackAlpha.700' : 'black'}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const displayName = pathNameMap[name] || name;

                return (
                    <BreadcrumbItem key={name}>
                        {isLast ? (
                            <BreadcrumbLink color='black'>{displayName}</BreadcrumbLink>
                        ) : (
                            <BreadcrumbLink color='blackAlpha.700' as={Link} to={routeTo}>
                                {displayName}
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
};
