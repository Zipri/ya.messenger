type StringIndexed = Record<string, any>;

const queryStringify = (data: StringIndexed): string | never => {
  // Проверяем, что входной параметр - объект
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error('input must be an object');
  }

  const params: string[] = [];

  function buildQuery(obj: any, prefix: string = ''): void {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const fullKey = prefix ? `${prefix}[${key}]` : key;

        if (Array.isArray(value)) {
          // Обрабатываем массивы
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              buildQuery(item, `${fullKey}[${index}]`);
            } else {
              params.push(`${fullKey}[${index}]=${item}`);
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          // Рекурсивно обрабатываем вложенные объекты
          buildQuery(value, fullKey);
        } else {
          // Обрабатываем примитивные значения
          params.push(`${fullKey}=${value}`);
        }
      }
    }
  }

  buildQuery(data);
  return params.join('&');
};

export default queryStringify;
