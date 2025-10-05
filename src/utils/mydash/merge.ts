type Indexed<T = unknown> = {
  [key in string]: T;
};

const merge = (fromObj: Indexed, toObj: Indexed): Indexed => {
  const result: Indexed = {};

  // Сначала копируем все ключи из левого объекта
  for (const key in fromObj) {
    if (fromObj.hasOwnProperty(key)) {
      result[key] = fromObj[key];
    }
  }

  // Затем обрабатываем ключи из правого объекта
  for (const key in toObj) {
    if (toObj.hasOwnProperty(key)) {
      // Если ключ существует в результате и оба значения - объекты, рекурсивно сливаем
      if (
        result[key] &&
        typeof result[key] === 'object' &&
        result[key] !== null &&
        typeof toObj[key] === 'object' &&
        toObj[key] !== null &&
        !Array.isArray(result[key]) &&
        !Array.isArray(toObj[key])
      ) {
        result[key] = merge(result[key] as Indexed, toObj[key] as Indexed);
      } else {
        // Иначе просто перезаписываем значение
        result[key] = toObj[key];
      }
    }
  }

  return result;
};

export default merge;
