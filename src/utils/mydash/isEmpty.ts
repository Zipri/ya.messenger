/**
 * Проверяет, является ли значение пустым
 * @param value - значение, которое нужно проверить
 * @returns true, если значение пустое, иначе false
 */
function isEmpty(value: unknown): boolean {
    if (value === null || typeof value === 'undefined') {
        return true;
    }

    if (typeof value === 'boolean' || typeof value === 'number') {
        return true;
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }

    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
}

export default isEmpty;
