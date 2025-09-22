/**
 * Возвращает последний элемент массива
 * @param list - массив, из которого нужно вернуть последний элемент
 * @returns последний элемент массива или undefined, если массив невалидный или пустой
 */
function last<T>(list: T[]): T | undefined {
    if (!Array.isArray(list)) return undefined;
    if (list.length === 0) return undefined;
    return list[list.length - 1];
}

export default last;
