class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

function take<T>(list: T[], num: number = 1): T[] {
  // Валидация первого аргумента - должен быть массив
  if (!Array.isArray(list)) {
    throw new ValidationError('bad value');
  }

  // Валидация второго аргумента - должен быть число
  if (typeof num !== 'number' || !Number.isInteger(num) || num < 0) {
    throw new ValidationError('bad value');
  }

  // Возвращаем первые num элементов
  return list.slice(0, num);
}

export default take;
