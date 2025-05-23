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

import { selectAllCategories } from '~/entities/Category';
import { useGetRecipeByIdQuery } from '~/shared/api/yeedaaApi';
import { PAGE_TITLES } from '~/shared/config/page-titles.constants';
import { ROUTES } from '~/shared/config/routes.constants';
import { closeBurger } from '~/widgets/Layout';

type AppBreadcrumbProps = BreadcrumbProps & {
    isMobile?: boolean;
};

export const AppBreadcrumb = ({ isMobile = false, ...props }: AppBreadcrumbProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const categorys = useSelector(selectAllCategories);
    const isMobileResolution = useBreakpointValue({ base: true, lg: false });
    const dispatch = useDispatch();

    const { data: recipe } = useGetRecipeByIdQuery(pathnames[2], { skip: !pathnames[2] });

    const onBreadcrumbClick = () => {
        dispatch(closeBurger());
    };

    return pathnames[0] === ROUTES.NOT_FOUND ? null : (
        <Breadcrumb
            listProps={{ flexWrap: 'wrap' }}
            separator={<ChevronRightIcon color='blackAlpha.700' />}
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
                    to={ROUTES.HOME}
                    color={pathnames.length > 0 ? 'blackAlpha.700' : 'black'}
                    onClick={onBreadcrumbClick}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                let displayName: string | undefined;

                switch (index) {
                    case 0:
                        if (name === ROUTES.THE_JUICIEST.split('/')[1]) {
                            displayName = PAGE_TITLES.THE_JUICIEST;
                        } else {
                            displayName = categorys.find((c) => c.category === name)?.title;
                        }
                        break;
                    case 1:
                        displayName = categorys.find((sub) => sub.category === name)?.title;
                        break;
                    case 2:
                        displayName = recipe?.title ?? name;
                        break;
                    default:
                        displayName = name;
                        break;
                }

                return (
                    <BreadcrumbItem whiteSpace='nowrap' key={name}>
                        {isLast ? (
                            <BreadcrumbLink
                                color='black'
                                maxW='200px'
                                overflow='hidden'
                                textOverflow='ellipsis'
                                onClick={onBreadcrumbClick}
                            >
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
