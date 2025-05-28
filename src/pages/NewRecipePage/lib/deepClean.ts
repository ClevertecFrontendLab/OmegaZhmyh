export function deepClean<T>(obj: T): T {
    if (Array.isArray(obj)) {
        // Очищаем каждый элемент массива и фильтруем пустые
        return obj
            .map(deepClean)
            .filter(
                (item) =>
                    item !== undefined &&
                    item !== null &&
                    !(typeof item === 'string' && item.trim() === '') &&
                    !(Array.isArray(item) && item.length === 0) &&
                    !(typeof item === 'object' && Object.keys(item).length === 0),
            ) as unknown as T;
    } else if (typeof obj === 'object' && obj !== null) {
        const cleanedObj = {} as Record<string, unknown>;
        Object.entries(obj).forEach(([key, value]) => {
            const cleanedValue = deepClean(value);
            if (
                cleanedValue !== undefined &&
                cleanedValue !== null &&
                !(typeof cleanedValue === 'string' && cleanedValue.trim() === '') &&
                !(Array.isArray(cleanedValue) && cleanedValue.length === 0) &&
                !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)
            ) {
                cleanedObj[key] = cleanedValue;
            }
        });
        return cleanedObj as T;
    } else if (typeof obj === 'string') {
        return obj.trim() as T;
    }
    return obj;
}
