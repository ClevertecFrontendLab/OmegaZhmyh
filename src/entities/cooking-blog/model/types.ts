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
