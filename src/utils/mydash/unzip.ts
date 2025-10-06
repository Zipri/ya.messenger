function unzip(...arrays: any[]): any[][] {
  // Проверяем, что все аргументы являются массивами
  for (const arg of arrays) {
    if (!Array.isArray(arg)) {
      throw new Error(`${arg} is not array`);
    }
  }

  // Если нет аргументов, возвращаем пустой массив
  if (arrays.length === 0) {
    return [];
  }

  // Находим максимальную длину среди всех массивов
  const maxLength = Math.max(...arrays.map((arr) => arr.length));

  // Создаем результирующий массив
  const result: any[][] = [];

  // Группируем элементы по индексам
  for (let i = 0; i < maxLength; i++) {
    const group: any[] = [];
    for (const array of arrays) {
      group.push(array[i]); // undefined для индексов, которых нет в массиве
    }
    result.push(group);
  }

  return result;
}

export default unzip;
