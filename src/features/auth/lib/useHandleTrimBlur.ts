import { useFormikContext } from 'formik';

export const useHandleTrimBlur = () => {
    const { setFieldValue, handleBlur } = useFormikContext();

    return (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFieldValue(name, value.trim());
        handleBlur({ target: { name, value: value.trim() } });
    };
};
