export type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type MeasureUnit = {
    _id: string;
    name: string;
};

export type ImageUploadResponse = {
    name: string;
    url: string;
    _id: string;
};
