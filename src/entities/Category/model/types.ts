export interface categoryState {
    pageCategory: string;
    pageSubategory: string;
    categoryList: {
        [key: string]: {
            icon: string;
            label: string;
            subcategory: { name: string; label: string }[];
        };
    };
}

export interface categoryLabels {
    [key: string]: string;
}
