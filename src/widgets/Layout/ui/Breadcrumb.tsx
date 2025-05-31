import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatches } from 'react-router';

import { selectMainCategories, selectSubCategories } from '~/entities/Category';
import { useGetRecipeByIdQuery } from '~/entities/Recipe';

import { closeBurger } from '../model/slice';

type RouteHandle = Partial<{
    title: string;
    path: string;
}>;

type Params = Partial<{
    category: string;
    subcategory: string;
    id: string;
}>;

type Match = {
    handle?: RouteHandle;
    params: Params;
};

type Crumb = {
    title: string;
    path: string;
};

type BreadcrumbsProps = BreadcrumbProps & {
    isBurgerBreadcrumbs?: boolean;
};

export function Breadcrumbs({ isBurgerBreadcrumbs = false, ...props }: BreadcrumbsProps) {
    const matches = useMatches() as Match[];

    const crumbs = matches
        .filter((match) => match.handle?.title && match.handle?.path)
        .map((match) => ({
            title: match.handle?.title,
            path: match.handle?.path,
        }));

    const { category, subcategory, id } =
        matches.find((match) => Object.keys(match.params).length > 0)?.params || {};

    const maincategories = useSelector(selectMainCategories);
    const subcategories = useSelector(selectSubCategories);
    const { data: recipe } = useGetRecipeByIdQuery(id as string, { skip: !id });

    const recipeTitle = recipe && id ? recipe.title : undefined;
    const { title: maincategoryTitle } =
        maincategories.find((maincategory) => maincategory.category === category) || {};
    const { title: subcategoryTitle } =
        subcategories?.find((item) => item.category === subcategory) || {};

    const breadcrumbs: Crumb[] = [
        ...crumbs,
        { title: maincategoryTitle, path: `/${category}` },
        { title: subcategoryTitle, path: `/${category}/${subcategory}` },
        { title: recipeTitle, path: `/${category}/${subcategory}/${id}` },
    ].filter((crumb): crumb is Crumb => Boolean(crumb.title && crumb.path));

    const isMobileResolution = useBreakpointValue({ base: true, lg: false });

    const isDataTestIdNeed =
        (isMobileResolution && isBurgerBreadcrumbs) ||
        (!isMobileResolution && !isBurgerBreadcrumbs);
    const dataTestId = isDataTestIdNeed ? 'breadcrumbs' : '';

    const dispatch = useDispatch();

    const handleBreadcrumbClick = () => {
        dispatch(closeBurger());
    };

    return (
        <Breadcrumb
            listProps={{ flexWrap: 'wrap' }}
            separator={<ChevronRightIcon color='blackAlpha.700' />}
            data-test-id={dataTestId}
            {...props}
        >
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                    <BreadcrumbItem whiteSpace='nowrap' key={crumb.path}>
                        {isLast ? (
                            <BreadcrumbLink
                                color='black'
                                textDecoration='none'
                                pointerEvents='none'
                            >
                                {crumb.title}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbLink
                                color='blackAlpha.700'
                                as={Link}
                                to={crumb.path}
                                onClick={handleBreadcrumbClick}
                            >
                                {crumb.title}
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
