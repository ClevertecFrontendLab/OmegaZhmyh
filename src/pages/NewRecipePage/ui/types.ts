export interface Step {
    description: string;
    image?: string;
}

export interface StepItemProps {
    step: Step;
    index: number;
    onImageClick: () => void;
    onRemove: () => void;
}

export interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    previewUrl: string | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    onRemoveImage: () => void;
    hasImage: boolean;
}
