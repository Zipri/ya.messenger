const isEqual = (a: object, b: object): boolean => {
  // Если ссылки на один объект
  if (a === b) {
    return true;
  }

  // Если один из аргументов null или undefined
  if (a == null || b == null) {
    return a === b;
  }

  // Получаем ключи обоих объектов
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Если количество ключей разное
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Проверяем каждый ключ
  for (const key of keysA) {
    // Если ключ отсутствует во втором объекте
    if (!keysB.includes(key)) {
      return false;
    }

    const valueA = (a as Record<string, string>)[key];
    const valueB = (b as Record<string, string>)[key];

    // Если значения - объекты, рекурсивно сравниваем
    if (
      typeof valueA === 'object' &&
      valueA !== null &&
      typeof valueB === 'object' &&
      valueB !== null
    ) {
      if (!isEqual(valueA, valueB)) {
        return false;
      }
    } else {
      // Для примитивных значений делаем прямое сравнение
      if (valueA !== valueB) {
        return false;
      }
    }
  }

  return true;
};

export default isEqual;
