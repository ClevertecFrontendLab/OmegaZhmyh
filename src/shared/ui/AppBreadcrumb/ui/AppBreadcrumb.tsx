import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { selectPageCategory, selectPageSubcategory } from '~/entities/Category/';
import { selectPageRecipe } from '~/entities/Recipe';
import { closeBurger } from '~/widgets/Layout';

interface AppBreadcrumbProps extends BreadcrumbProps {
    isMobile?: boolean;
}

export const AppBreadcrumb = ({ isMobile = false, ...props }: AppBreadcrumbProps) => {
    const pageCategory = useSelector(selectPageCategory);
    const pageSubcategory = useSelector(selectPageSubcategory);
    const pageRecipe = useSelector(selectPageRecipe);
    const dispatch = useDispatch();
    const isMobileResolution = useBreakpointValue({ base: true, lg: false });

    const onBreadcrumbClick = () => {
        dispatch(closeBurger());
    };

    return (
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
                    to='/'
                    color={pageCategory ? 'blackAlpha.700' : 'black'}
                    onClick={onBreadcrumbClick}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {!pageCategory ? null : (
                <BreadcrumbItem whiteSpace='nowrap'>
                    <BreadcrumbLink
                        color={pageSubcategory ? 'black' : 'blackAlpha.700'}
                        maxW={pageSubcategory ? '200px' : 'none'}
                        overflow={pageSubcategory ? 'hidden' : 'visible'}
                        textOverflow={pageSubcategory ? 'ellipsis' : 'clip'}
                        as={Link}
                        to={`/${pageCategory.category}/${pageCategory.subCategories[0].category}`}
                        onClick={onBreadcrumbClick}
                    >
                        {pageCategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {!pageSubcategory ? null : (
                <BreadcrumbItem whiteSpace='nowrap' key={pageSubcategory._id}>
                    <BreadcrumbLink
                        color={pageRecipe ? 'black' : 'blackAlpha.700'}
                        maxW={pageRecipe ? '200px' : 'none'}
                        overflow={pageRecipe ? 'hidden' : 'visible'}
                        textOverflow={pageRecipe ? 'ellipsis' : 'clip'}
                        as={Link}
                        to={`/${pageCategory?.category}/${pageSubcategory.category}`}
                        onClick={onBreadcrumbClick}
                    >
                        {pageSubcategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {!pageRecipe ? null : (
                <BreadcrumbItem whiteSpace='nowrap'>
                    <BreadcrumbLink
                        color='black'
                        maxW='200px'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        onClick={onBreadcrumbClick}
                    >
                        {pageRecipe.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
