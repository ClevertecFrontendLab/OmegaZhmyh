import { Recipe } from '~/entities/recipe/@x/cooking-blog';

export type Note = Partial<{
    date: string;
    text: string;
}>;

export type Bloger = Partial<{
    bookmarksCount: number;
    firstName: string;
    isFavorite: boolean;
    lastName: string;
    login: string;
    newRecipesCount: number;
    notes: Note[];
    subscribersCount: number;
    _id: string;
}>;

export type BloggerInfo = Partial<{
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: Recipe[];
    subscriptions: string[];
    subscribers: string[];
    notes: Note[];
}>;

export type AllBlogersRequest = {
    currentUserId: string;
    limit?: number | string;
};

export type AllBlogersResponse = Partial<{
    favorites: Bloger[];
    others: Bloger[];
}>;

export type BloggerByIdResponse = {
    bloggerInfo: BloggerInfo;
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};

export type BlogerByIdRequest = {
    bloggerId: string;
    currentUserId: string;
};
