/**
 * Возвращает первый элемент массива
 * @param list - массив, из которого нужно вернуть первый элемент
 * @returns первый элемент массива или undefined, если массив невалидный или пустой
 */
function first<T>(list: T[]): T | undefined {
    if (!Array.isArray(list)) return undefined;
    if (list.length === 0) return undefined;
    return list[0];
}

export default first;
