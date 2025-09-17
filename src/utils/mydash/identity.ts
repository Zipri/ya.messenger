/**
 * Возвращает переданное значение
 * @param value - значение, которое нужно вернуть
 * @returns значение, которое было передано
 */
function identity<T>(value: T): T {
    return value;
}

export default identity;
