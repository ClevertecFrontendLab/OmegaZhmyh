export interface categoryShema {
    [key: string]: {
        icon: string;
        label: string;
        subcategory: { name: string; label: string }[];
    };
}
