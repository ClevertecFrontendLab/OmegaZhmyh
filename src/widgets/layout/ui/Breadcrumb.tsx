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

import { selectMainCategories, selectSubCategories } from '~/entities/category';
import { useGetBloggerByIdQuery } from '~/entities/cooking-blog';
import { useGetRecipeByIdQuery } from '~/entities/recipe';
import { selectUserId } from '~/features/auth';

import { closeBurger } from '../model/slice';

type RouteHandle = Partial<{
    title: string;
    path: string;
}>;

type Params = Partial<{
    category: string;
    subcategory: string;
    id: string;
    bloggerId: string;
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
    console.log(matches);
    const crumbs = matches
        .filter((match) => match.handle?.title && match.handle?.path)
        .map((match) => ({
            title: match.handle?.title,
            path: match.handle?.path,
        }));

    const { category, subcategory, id, bloggerId } =
        matches.find((match) => Object.keys(match.params).length > 0)?.params || {};

    const maincategories = useSelector(selectMainCategories);
    const subcategories = useSelector(selectSubCategories);
    const currentUserId = useSelector(selectUserId);
    const { data: recipe } = useGetRecipeByIdQuery(id as string, { skip: !id });
    const { data: blogger } = useGetBloggerByIdQuery(
        {
            bloggerId: bloggerId as string,
            currentUserId: currentUserId as string,
        },
        { skip: !bloggerId },
    );

    const recipeTitle = recipe && id ? recipe.title : undefined;
    const { title: maincategoryTitle } =
        maincategories.find((maincategory) => maincategory.category === category) || {};
    const { title: subcategoryTitle } =
        subcategories?.find((item) => item.category === subcategory) || {};
    const bloggerTitle =
        blogger?.bloggerInfo && bloggerId
            ? `${blogger.bloggerInfo.firstName} ${blogger.bloggerInfo.lastName} (@${blogger.bloggerInfo.login})`
            : undefined;

    const breadcrumbs: Crumb[] = [
        ...crumbs,
        { title: maincategoryTitle, path: `/${category}` },
        { title: subcategoryTitle, path: `/${category}/${subcategory}` },
        { title: recipeTitle, path: `/${category}/${subcategory}/${id}` },
        { title: bloggerTitle, path: `/blogs/${bloggerId}` },
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
