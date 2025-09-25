type Indexed<T = unknown> = {
  [key in string]: T;
};

const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown => {
  // Проверяем, что path — строка
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  // Если object не объект, возвращаем его как есть
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  // Разбиваем путь на части
  const keys = path.split('.');

  // Ссылка на текущий объект для навигации
  let current = object as Indexed;

  // Проходим по всем ключам кроме последнего
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    // Если ключа не существует или значение не объект, создаем новый объект
    if (
      !current[key] ||
      typeof current[key] !== 'object' ||
      current[key] === null
    ) {
      current[key] = {};
    }

    // Переходим к следующему уровню
    current = current[key] as Indexed;
  }

  // Устанавливаем значение по последнему ключу
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;

  return object;
};

export default set;
