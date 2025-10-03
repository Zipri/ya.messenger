const cloneDeep = <T extends object = object>(obj: T): T => {
  // Если значение null или undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Если это не объект (примитивное значение)
  if (typeof obj !== 'object') {
    return obj;
  }

  // Если это массив
  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as T;
  }

  // Если это Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // Если это RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  // Для обычных объектов
  const cloned = {} as T;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = cloneDeep(obj[key] as object) as T[Extract<
        keyof T,
        string
      >];
    }
  }

  return cloned;
};

export default cloneDeep;
