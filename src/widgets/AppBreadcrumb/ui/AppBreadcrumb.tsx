import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

interface AppBreadcrumbProps extends BreadcrumbProps {}

export const AppBreadcrumb = (props: AppBreadcrumbProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const pathNameMap: { [key: string]: string } = {
        'Vegan-cuisine': 'Веганская кухня',
        Juiciest: 'Самое сочное',
        'Main-courses': 'Вторые блюда',
    };

    return (
        <Breadcrumb separator={<ChevronRightIcon />} {...props}>
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
